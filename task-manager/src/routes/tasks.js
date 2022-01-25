const router = require('express').Router();
const auth = require('../middleware/auth');
const { Task } = require('../models');

// desc: create task
// access: private
router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user.id
  });
  
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.sendStatus(400);
  }
});

// desc: get logged in user's tasks
// access: private
router.get('/tasks', auth, async (req, res) => {
  try {
    await req.user.populate('tasks');
    res.send(req.user.tasks);
  } catch (e) {
    res.sendStatus(500);
  }
});

// desc: get task by id and logged in user id (owner of task)
// access: private
router.get('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ id: req.params.id, owner: req.user.id });
    if (!task) {
      return res.sendStatus(404);
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// desc: update task
// access: private
router.patch('/tasks/:id', auth, async (req, res) => {
  const allowedUpdates = ['description', 'completed'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
  }
  try {
    const task = await Task.findOne({ id: req.params.id, owner: req.user.id });
    if (!task) {
      return res.sendStatus(404);
    }
    updates.forEach(update => task[update] = req.body[update]);
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// desc: delete task
// access: private
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ id: req.params.id, owner: req.user.id });
    if (!task) {
      return res.sendStatus(404);
    }
    res.send(task);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;