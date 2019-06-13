const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
  name: String,
  description: String,
  value: Number,
  image: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Article', ArticleSchema);
