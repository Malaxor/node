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

// get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.sendStatus(500);
  }
});

// get task by id
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.sendStatus(404);
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});



// update task
router.patch('/tasks/:id', async (req, res) => {
  const allowedUpdates = ['description', 'completed'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
  }
  try {
    const task = await Task.findById(req.params.id);
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

// delete task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.sendStatus(404);
    }
    res.send(task);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;