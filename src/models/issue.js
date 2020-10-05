import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Issue = new Schema({
    _senderId: { type: Schema.Types.ObjectId, ref: 'accounts' },
    message: String,
    prove: String,
    status: String,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('issues', Issue);
