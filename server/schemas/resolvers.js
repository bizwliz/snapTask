const { User, Snap, Department, Task } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    departments: async () => {
      return await Department.find();
    },
    snaps: async (parent, args ) => {


      return await Snap.find();
    },
    snap: async (parent, { _id }) => {
      return await Snap.findById(_id).populate('Department');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'tasks.snaps',
          populate: 'department'
        });

        user.tasks.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },
    task: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'tasks.snaps',
          populate: 'department'
        });

        return user.tasks.id(_id);
      }

      throw AuthenticationError;
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      await Task.create({ Snaps: args.Snaps.map(({ _id }) => _id) });
      // eslint-disable-next-line camelcase
      const line_items = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const snap of args.snaps) {
        line_items.push({
          price_data: {
            currency: 'usd',
            snap_data: {
              name: snap.name,
              description: snap.description,
              images: [`${url}/images/${snap.image}`]
            },
            unit_amount: snap.price * 100,
          },
          quantity: snap.purchaseQuantity,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addTask: async (parent, { snaps }, context) => {
      if (context.user) {
        const task = new Task({ snaps });

        await User.findByIdAndUpdate(context.user._id, { $push: { tasks: task } });

        return task;
      }

      throw AuthenticationError;
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw AuthenticationError;
    },
    updateSnap: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Snap.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
