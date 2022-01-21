const { model } = require('mongoose');

const Task = new model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});
module.exports = Task;