const mongoose = require('mongoose');
const shortid = require('shortid');

const PurchaseSchema = mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  date: Date,
  buyerName: String,
  cardNumber: Number,
  totalItems: Number,
  netTotal: Number,
  taxes: Number,
  totalAmount: Number,
  status: String,
  detail: Map,
},
{
  timestamps: true,
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
