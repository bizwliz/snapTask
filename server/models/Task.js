const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  snaps: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Snap'
    }
  ]
});

const Task = mongoose.model('Task', orderSchema);

module.exports = Task;
