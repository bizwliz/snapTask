const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const snapSchema = new Schema({
  snapTitle: {
    type: String,
    required: 'You need to leave a snap!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  snapDepartment: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Snap = model('Snap', snapSchema);

module.exports = Snap;
