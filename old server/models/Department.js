const mongoose = require('mongoose');

const { Schema } = mongoose;

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
