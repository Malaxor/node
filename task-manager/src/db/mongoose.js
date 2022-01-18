const { connect, model } = require('mongoose');

connect('mongodb://127.0.0.1:27017/task-manager');

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
