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

const me = new User({
  name: 'Philip Costache',
  age: 'Mike'
});

me.save()
.then(user => console.log(user))
.catch(err => console.log(err));