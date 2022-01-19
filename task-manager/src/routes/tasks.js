const router = require('express').Router();
const { Task } = require('../models');

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.sendStatus(400);
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.sendStatus(404);
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(err);
  }
});

router.patch('/tasks/:id', async (req, res) => {
  const allowedUpdates = ['description', 'completed'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates '});
  }
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body, 
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.sendStatus(404);
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

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