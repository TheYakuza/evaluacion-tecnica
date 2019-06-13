import articles from './Articles';

const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
  items: [articles],
  commited: Boolean,
},
{
  timestamps: true,
});

module.exports = mongoose.model('Cart', CartSchema);
