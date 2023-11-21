const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
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

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
