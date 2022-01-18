const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { user: User, task: Task } = require('./models');

require('./db/mongoose');
app.use(express.json());

app.get('/users', (req, res) => {
  User.find({})
  .then(users => res.send(users))
  .catch(err => res.status(500).send(err));
});

app.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
  .then(user => { 
    if (!user) {
      return res.sendStatus(404);
    }
    res.send(user);
  })
  .catch(err => res.status(500).send(err));
});

app.post('/users', (req, res) => {
  const user = new User(req.body);
  user.save()
  .then(user => res.status(201).send(user))
  .catch(err => res.status(400).send(err));
});

app.post('/tasks', (req, res) => {
  const task = new Task(req.body);
  task.save()
  .then(task => res.status(201).send(task))
  .catch(err => res.status(400).send(err));
});

app.get('/tasks', (req, res) => {
  Task.find({})
  .then(tasks => res.send(tasks))
  .catch(err => res.sendStatus(500));
});

app.get('/tasks/:id', (req, res) => {
  Task.findById(req.params.id)
  .then(task => { 
    if (!task) {
      return res.sendStatus(404);
    }
    res.send(task);
  })
  .catch(err => res.status(500).send(err));
});

app.listen(port, () => console.log('listening on port ' + port));