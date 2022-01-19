const { model } = require('mongoose');

const Task = new model('tasks', {
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