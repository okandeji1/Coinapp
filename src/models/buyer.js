import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Buyer = new Schema({
  _sellerId: { type: Schema.Types.ObjectId, ref: 'accounts' },
  _buyerId: { type: Schema.Types.ObjectId, ref: 'accounts' },
  _sellId: { type: Schema.Types.ObjectId, ref: 'sellers' },
  coin: Number,
  amount: Number,
  lastUpdate: Date,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('buyers', Buyer);
