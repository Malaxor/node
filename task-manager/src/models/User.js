const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
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
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password must not contain the word password');
      }
    }
  },
  tokens: [{ 
    token: {
      type: String,
      required: true
    }
  }]
});

// returns only the fields that you want the public to see
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  
  delete userObject.password;
  delete userObject.tokens;
  
  return userObject;
}

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ id: this.id.toString() }, 'jwtsecret');
  this.tokens = [...this.tokens, { token }];
  await this.save();
  return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
}

// hash password before saving
userSchema.pre('save', async function (next) {
  // true when user is created and when the user changes his/her password
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = model('users', userSchema);
module.exports = User;