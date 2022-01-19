const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { user: User, task: Task } = require('./models');

require('./db/mongoose');
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.sendStatus(500);
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.sendStatus(404);
    }
    res.send(user);
  } catch (e) {
    res.sendStatus(500);
  }
});

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.patch('/users/:id', async (req, res) => {
  const allowedUpdates = ['name', 'age', 'password', 'age'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates '});
  }
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.sendStatus(404);
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.sendStatus(400);
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.sendStatus(500)
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.sendStatus(404);
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(err)
  }
});

app.listen(port, () => console.log('listening on port ' + port));