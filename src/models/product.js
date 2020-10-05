import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Product = new Schema({
    price: {
        type: Number,
        default: 100
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('products', Product);