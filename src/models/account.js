const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
    roleId: { type: String, lowercase: true, trim: true, default: 'user', enum: ['admin', 'user'] },
    _walletId: { type: Schema.Types.ObjectId, ref: 'wallets' },
    // wallet : {
    //   coin: { type: Number, default: 0 },
    // }
    firstname: { type: String },
    lastname: {
        type: String,
    },
    email: { type: String, index: { unique: true } },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        // required: true
    },
    bio: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        default: null
    },
    dob: {
        type: String,
        default: null
    },
    address: {
        type: String,
    },
    phone: {
        type: Number,
    },
    network: {
        type: String,
    },
    photo: {
        type: String,
        default: 'profile.png'
    },
    token: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('accounts', Account);