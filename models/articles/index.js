const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = require('../user');
const Category = require('./category');

const Article = new Schema({
  title: String,
  content: String,
  tags: [String],
  categories: [Category],
  author: User,
}, {
  collection: 'articles',
  timestamps: true,
});

module.exports = mongoose.model('Article', Article);
