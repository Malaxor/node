const { connect, model } = require('mongoose');
const validator = require('validator');

connect('mongodb://127.0.0.1:27017/task-manager');

const User = new model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value  < 0) {
        throw new Error('Age must be a positive number');
      }
    }
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

// const task = new Task({
//   description: 'Daily walk',
//   completed: true
// });

// task.save()
// .then((walk) => console.log(walk))
// .catch((error) => console.error(error));

const user = new User({
  name: ' Philip ',
  email: 'PHILIPCOSTACHE@YAHOO.COM    '
});

user.save()
.then(user => console.log(user))
.catch(err => console.log(err));