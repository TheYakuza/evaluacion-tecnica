const mongoose = require('mongoose');

const { Schema } = mongoose;

const Category = new Schema({
  name: String,
}, {
  collection: 'categories',
  timestamps: true,
});

module.exports = mongoose.model('Category', Category);
