const { model, Schema } = require('mongoose');

const Task = model('tasks', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
});
module.exports = Task;