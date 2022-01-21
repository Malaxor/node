const router = require('express').Router();
const { User } = require('../models');

// login user
router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(User, email, password);
    res.send(user);
  } catch (e) {
    res.send(e.message);
  }
});

// get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.sendStatus(500);
  }
});

// get user by id
router.get('/users/:id', async (req, res) => {
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

// create user
router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// update user
router.patch('/users/:id', async (req, res) => {
  const allowedUpdates = ['name', 'age', 'password', 'age'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates '});
  }
  try {
    // findByIdAndUpdate bypasses mongoose midlewear

    // const user = await User.findByIdAndUpdate(
    //   req.params.id, 
    //   req.body, 
    //   { new: true, runValidators: true }
    // );
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.sendStatus(404);
    }
    updates.forEach((update) => user[update] = req.body[update]);
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.sendStatus(404);
    }
    res.send(user);
  } catch (e) {
    res.sendStatus(500);
  }
});
module.exports = router;