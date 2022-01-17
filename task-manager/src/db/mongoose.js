const { connect, model } = require('mongoose');

connect('mongodb://127.0.0.1:27017/task-manager');

const User = new model('User', {
  name: {
    type: String
  },
  age: {
    type: Number
  }
});

const Task = new model('Task', {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
});

const task = new Task({
  description: 'Daily walk',
  completed: true
});

task.save()
.then((walk) => console.log(walk))
.catch((error) => console.error(error));

const user = new User({
  name: 'Philip Costache',
  age: 38
});

user.save()
.then(user => console.log(user))
.catch(err => console.log(err));