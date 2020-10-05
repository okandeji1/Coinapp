import express from 'express';
import expressSession from 'express-session';
import guard from 'connect-ensure-login';
import validator from 'express-validator';
import flash from 'connect-flash';
import passport from 'passport';
import RememberMeStrategy from 'passport-remember-me';
import Seller from '../models/seller';
import Account from '../models/account';
import cors from 'cors';
// import Business from '../models/business';
// import Subscription from '../models/subscription';
const router = express.Router();

// Prevent users from pages without login

function requiresLogin(req, res, next) {
    if (req.session && req.user._id) {
        return next();
    } else {
        //   var err = new Error('You must be logged in to view this page.');
        //   err.status = 401;
        res.redirect('/login');
        return next(err);
    }
}

// router.get('/dashboard', async(req, res) => {
// const user = await Account.findById(req.user._id).populate('_roleId').populate('_storeId');
//     if (user.roleId === 'admin') {
//         res.redirect('/admin/dashboard');
//     } else if (user.roleId === 'sadmin') {
//         res.redirect('/sadmin/dashboard');
//     } else if (user._roleId.name === 'admin' && user._roleId.roleType === 'Store') {
//         res.redirect('/admin/dashboard');
//     } else if (user._roleId.name === 'staff' && user._roleId.roleType === 'Store') {
//         res.redirect(`/staff/dashboard/${user._storeId._id}/${user._branchId}`);
//     } else if (user._roleId.name === 'admin' && user._roleId.roleType === 'Branch') {
//         res.redirect(`/branch/admin/dashboard/${user._storeId._id}/${user._branchId}`);
//     } else if (user._roleId.name === 'staff' && user._roleId.roleType === 'Branch') {
//         res.redirect(`/staff/dashboard/${user._storeId._id}/${user._branchId}`);
//     }
// });


// router.get('/', (req, res) => {
//   res.render('site/index', { expressFlash: req.flash('info'), layout: 'layouts/site' });
// });

router.get('/', (req, res) => {
    res.render('layouts/site');
});


router.get('/about', (req, res) => {
    res.render('site/about', { layout: 'layouts/site' });
});

router.get('/dashboard', guard.ensureLoggedIn(), async(req, res) => {
    const user = await Account.findById(req.user._id).populate('_roleId');
    const sellers = await Seller.find({ _userId: req.user._id });
    if (user.roleId === 'admin') {
        res.redirect('/admin/dashboard');
    } else if (user.roleId === 'user') {
        res.render('user/dashboard', { layout: 'layouts/user', user, sellers });
    }
});

// Display User profile

router.get('/profile', guard.ensureLoggedIn(), (req, res, next) => {
    const user = req.user;
    // Account.findOne(user, (err, user) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //     }),
    Account.findById({ _id: req.user._id })
        .exec((err, user) => {
            if (err) {
                return next(err);
            } else {
                // console.log(req.session.user)
                // return false
            }
        });
    res.render('user/profile', {
        layout: 'layouts/user',
        user
    });
});

// Update Profile

router.get('/setting', guard.ensureLoggedIn(), (req, res, next) => {
    const user = req.user;
    // Account.findOne(user, (err, user) => {
    //         if (err) {
    //             console.log(err)
    //         }
    //     }),
    Account.findById({ _id: req.user._id })
        .exec((err, user) => {
            if (err) {
                return next(err);
            } else {
                // console.log(req.session.user)
                // return false
            }
        });
    res.render('user/setting', {
        layout: 'layouts/user',
        user
    });
});

// =====================================
// UPDATE PROFILE =================
// =====================================

// router.post('/setting', guard.ensureLoggedIn(), async(req, res, next) => {

//     const form = new formidable.IncomingForm();

//     form.parse(req, async(err, fields, files) => {

//         const newUser = await Account.findById(req.user._id)
//             .catch((err) => {
//                 console.log(err);

//             });
//         console.log(newUser);
//         return false;
//         if (!newUser)
//             return res.status(400).json({ message: 'User doesn\'t exist!' });
//         const passport = files.passport;
//         const member = fields;
//         if (passport && passport.name) {
//             const name = `${Math.round(Math.random() * 10000)}.${passport.name.split('.').pop()}`;
//             const dest = path.join(__dirname, '..', 'public', 'images', 'user', name);
//             const data = fs.readFileSync(passport.path);
//             fs.writeFileSync(dest, data);
//             fs.unlinkSync(passport.path);
//             user.passport = name;
//         }
//         Account.update(member, function(err) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 req.flash('success', 'Profile Update Successfully');
//                 // req.flash('success', `${getmember.firstname} update successfully`);
//                 res.redirect(`/profile`);
//             }
//         });
//     });

// });

router.post('/setting', function(req, res) {
    Account.update({ _id: req.session.user._id }, {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    }, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log(req.session.user);
            return false
                // req.flash('Profile Updated Successfully' + req.body.username);
                // res.send('Good Job');
            res.redirect('/profile')
        }
    });
    // res.render('profile', {
    //     user: req.user // get the user out of session and pass to template
    // });
});

router.get('/register', async(req, res) => {
    // const business = await Business.find();
    res.render('site/register', {
        // validator: req.flash('error'),
        expressFlash: req.flash('info')
            // layout: 'layouts/site'
    });
});

router.post('/register', (req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const country = req.body.country;
    const state = req.body.state;
    const city = req.body.city;
    const bio = req.body.bio;
    const gender = req.body.gender;
    const dob = req.body.dob;
    const username = req.body.username;
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    const address = req.body.address;
    const phone = req.body.phone;
    const network = req.body.network;
    const photo = req.body.photo;


    req.checkBody('firstname', 'First Name is required').notEmpty();
    req.checkBody('lastname', 'Last Name is required').notEmpty();
    req.checkBody('country', 'Country is required').notEmpty();
    req.checkBody('state', 'State is required').notEmpty();
    req.checkBody('city', 'City is required').notEmpty();
    req.checkBody('email', 'Email is required').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('cpassword', 'Password do not match').equals(req.body.password);
    req.checkBody('address', 'Contact Address is required').notEmpty();
    req.checkBody('phone', 'Contact Number is required').notEmpty();
    req.checkBody('network', 'Phone Network is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        req.flash('info', 'Fill the form correctly');
        // res.render('site/register', {
        //     errors: errors,
        //     layout: 'layouts/site'
        // })
    } else {
        const newUser = req.body;
        const password = req.body.password;
        delete newUser.password;

        Account.register(new Account(newUser), password,
            (err, newUsers) => {
                // console.log(password)
                // return false
                if (err) {
                    console.log(err);
                } else {
                    req.flash('info', 'Successfully Signed Up! Please login to continue');
                    res.redirect('/login');
                }
            });
    }

});

//  Login

router.get('/login', (req, res) => {
    res.render('site/login', { expressFlash: req.flash('info'), error: req.flash('error') });
});


router.post('/login', passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: true
        }),
        async(req, res, next) => {
            const query = { username: req.body.username };
            const user = Account.findOne(query, (err, user) => {
                if (err) throw err;
                if (!user) {
                    return done(null, false, { 'error': 'User not found' });
                    // res.render('user/login', {
                    // layout: 'layouts/site',
                    // req.flash('info', 'User not found')
                    // })
                } else {
                    req.session.user = user;
                    req.session.save((err) => {
                        if (err) {
                            return next(err);
                        } else if (user.roleId === 'admin') {
                            res.redirect('/admin/dashboard');
                        } else if (user.roleId === 'user') {
                            res.redirect('/dashboard');
                        }
                    });
                }
            });
        }),

    //  Logout

    router.get('/logout', (req, res, next) => {
        req.logout();
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/login');
        });
    });


router.get('/ping', (req, res) => {
    res.status(200).send('pong!');
});

export default router;