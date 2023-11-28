const { User, Snap } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('snaps');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('snaps');
    },
    snaps: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Snap.find(params).sort({ createdAt: -1 });
    },
    snap: async (parent, { snapId }) => {
      return Snap.findOne({ _id: snapId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('snaps');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
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
    },
    addSnap: async (parent, { snapTitle }, context) => {
      if (context.user) {
        const snap = await Snap.create({
          snapTitle,
          snapDepartment: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { snaps: snap._id } }
        );

        return snap;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    addComment: async (parent, { snapId, commentText }, context) => {
      if (context.user) {
        return Snap.findOneAndUpdate(
          { _id: snapId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeSnap: async (parent, { snapId }, context) => {
      if (context.user) {
        const snap = await Snap.findOneAndDelete({
          _id: snapId,
          snapDepartment: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { snaps: snap._id } }
        );

        return snap;
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { snapId, commentId }, context) => {
      if (context.user) {
        return Snap.findOneAndUpdate(
          { _id: snapId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
