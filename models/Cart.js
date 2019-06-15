const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
  items: Map,
  commited: Boolean,
},
{
  timestamps: true,
});

module.exports = mongoose.model('Cart', CartSchema);
