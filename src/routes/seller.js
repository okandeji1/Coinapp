import express from 'express';
import Account from '../models/account';
import guard from 'connect-ensure-login';
import Seller from '../models/seller';
import Bider from '../models/bider';

const router = express.Router();

// sell coin page
router.get('/', guard.ensureLoggedIn(), async(req, res) => {
    const user = await Account.findById(req.user._id).populate('_roleId').populate('_sellId');
    const sellers = await Seller.find({ _userId: req.user._id }).populate('_userId');
    res.render('seller/index', { user, sellers, expressFlash: req.flash('success'), expressFlashs: req.flash('fail'), layout: 'layouts/user' });
});

// sell coin
router.post('/', (req, res) => {

    var errors = req.validationErrors();

    const coin = req.body.coin;
    const amount = req.body.amount;


    req.checkBody('coin', 'Coin is required').notEmpty();
    req.checkBody('amount', 'amount is required').notEmpty();

    if (errors) {
        console.log(errors);
        req.flash('fail', errors);
        res.redirect('/seller');
    } else {
        const sell = new Seller(req.body);
        sell._userId = req.user._id;
        sell.save((err, sell) => {
            if (err) {
                console.log(err);
            } else {
                req.flash('success', 'Coin up for Sell successfully');
                res.redirect('/seller');
            }
        });
    }
});

// view biders
router.get('/biders/:_id', guard.ensureLoggedIn(), async(req, res) => {
    const user = await Account.findById(req.user._id).populate('_userId');
    const biders = await Bider.find({ _sellId: req.params._id }).populate('_userId');
    res.render('seller/biders', { biders, sellerId: req.params._id, layout: 'layouts/user' });
});


// buy coin in market
router.get('/market', guard.ensureLoggedIn(), async(req, res) => {
    const user = await Account.findById(req.user._id).populate('_roleId').populate('_sellId');
    const sellers = await Seller.find().populate('_userId');
    res.render('seller/market', { user, sellers, expressFlash: req.flash('success'), expressFlashs: req.flash('fail'), layout: 'layouts/user' });
});


router.get('/user/biders/:_id', guard.ensureLoggedIn(), async(req, res) => {
    const user = await Account.findById(req.user._id).populate('_userId');
    const biders = await Bider.count({ _sellId: req.params._id }).populate('_userId');
    console.log(biders);
    console.log('bidersddddddddddddddddddddd');
    res.render('bider/index', { biders, sellerId: req.params._id, layout: 'layouts/user' });
});

router.post('/bider/:_id', (req, res) => {

    var errors = req.validationErrors();

    const coin = req.body.coin;
    const amount = req.body.amount;

    req.checkBody('amount', 'Amount is required').notEmpty();

    if (errors) {

        console.log(errors);
        req.flash('info', 'Please check your input');

    } else {

        const bider = new Bider(req.body);
        bider._userId = req.user._id;
        bider._sellId = req.params._id;
        bider.save((err, bider) => {
            if (err) {
                res.send(err);
            } else {
                console.log('successfully bid');
                req.flash('info', 'You have successfully make bid');
                res.redirect(`/seller/user/biders/${req.params._id}`);
            }
        });
    }
});


// router.post('/buy', (req, res) => {

//   var errors = req.validationErrors();

//   const coin = req.body.coin;
//   const amount = req.body.amount;


//   req.checkBody('coin', 'Coin is required').notEmpty();
//   req.checkBody('amount', 'amount is required').notEmpty();

//   if (errors) {
//     console.log(errors);
//     req.flash('fail', errors);
//     res.redirect('/seller');
//   } else {
//     const sell = new Seller(req.body);
//     sell._userId = req.user._id;
//     sell.save((err, sell) => {
//       if (err) {
//         console.log(err);
//       } else {
//         req.flash('success', 'Coin up for Sell successfully');
//         res.redirect('/seller');
//       }
//     });
//   }
// });

export default router;