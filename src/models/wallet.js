import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Wallet = new Schema({
  coin: Number,
  valuePerCoin: Number,
  lastUpdate: Date,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('wallets', Wallet);
