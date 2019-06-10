const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: false,
  },
  update_date: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: 'users',
});

module.exports = mongoose.model('User', User);
