const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Seller = new Schema({
  _userId: { type: Schema.Types.ObjectId, ref: 'accounts' },
  coin: Number,
  amount: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('sellers', Seller);
