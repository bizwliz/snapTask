const mongoose = require('mongoose');

const { Schema } = mongoose;

const snapSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  }
});

const Snap = mongoose.model('Snap', snapSchema);

module.exports = Snap;
