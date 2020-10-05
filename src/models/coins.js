import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Coin = new Schema({
  coin: Number,
  _userId: { type: Schema.Types.ObjectId, ref: 'accounts' },
  valuePerCoin: Number,
  lastUpdate: Date,
  regrowCount: Number,
  status: {
    type: String,
    lowercase: true,
    trim: true,
    default: 'user',
    enum: ['active', 'matured']
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('coins', Coin);
