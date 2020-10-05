import express from 'express';
import Bid from '../models/bider';
import path from 'path';
import guard from 'connect-ensure-login';
import { check, validationResult } from 'express-validator/check';
import validator from 'express-validator';
import flash from 'connect-flash';
import { Types } from 'mongoose';

const router = express.Router();

// router.get('/', guard.ensureLoggedIn(), (req, res, next) => {
//     const user = await Account.findById(req.user._id).populate('_userId').populate('_sellId');
//     const seller = await Sell.find({ _sellId: req.user._sellId, show: true });

//     res.render('user/bid', {
//         user,
//         seller,
//         expressFlash: req.flash('info'),
//         layout: 'layouts/user',
//     });
// });

// router.get('/:_id', guard.ensureLoggedIn(), (req, res) => {
//     res.render('user/bid', { layout: 'layouts/user' })
// })

// router.post('/:_id', (req, res) => {
//     const coin = req.body.coin;
//     const amount = req.body.amount;
//     console.log(req.body);
//     return false;
//     req.checkBody('amount', 'Amount is required').notEmpty();
//     var errors = req.validationErrors();
//     if (errors) {
//         console.log(errors);
//         req.flash('info', 'Please check your input')
//     } else {
//         const bid = new Bid(req.body);
//         bid._userId = req.user._id;
//         bid._sellId = req.sell._id;
//         bid.save((err, bids) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 req.flash('info', 'You have successfully make bid');
//                 res.redirect('/bid')
//             }
//         })
//     }
// });

export default router;