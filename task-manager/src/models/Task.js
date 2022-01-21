const { model } = require('mongoose');

const Task = model('tasks', {
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