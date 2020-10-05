import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Transaction = new Schema({
    _userId: { type: Schema.Types.ObjectId, ref: 'accounts' },
    walletCredited: Number,
    walletDebited: Number,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('transactions', Transaction);
