const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'jwtsecret');
    const user = await User.findOne({ id: decoded.id,  'tokens.token': token });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' });
  }
}
