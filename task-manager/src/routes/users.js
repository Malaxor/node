const router = require('express').Router();
const { User } = require('../models');

// desc: sign up user
// access: public
router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});


// desc: login user
// access: public
router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.send(e);
  }
});

// get all users
// access: private
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.sendStatus(500);
  }
});

// desc: get user by id
// access: private
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


// desc: update user
// access: private
router.patch('/users/:id', async (req, res) => {
  const allowedUpdates = ['name', 'age', 'password', 'age'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
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

// desc: delete user
// access: private
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