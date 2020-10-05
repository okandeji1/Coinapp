import express from 'express';
import path from 'path';
// import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import expressSession from 'express-session';
import RememberMeStrategy from 'passport-remember-me';
import validator from 'express-validator';
import toastr from 'express-toastr';
import bodyParser from 'body-parser';
import lessMiddleware from 'less-middleware';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import mongoose from 'mongoose';
import { Strategy } from 'passport-local';
import hbs from 'hbs';
import hbsutils from 'hbs-utils';

// for window auto
// var Service = require('node-windows').Service;

// routes are imported here, note any auth or init middleware are to be placed
// above this line.
import index from './routes/index';
import seller from './routes/seller';
import bider from './routes/bider';
import Register from './routes/mobile/register';
// import users from './routes/users';

import cors from 'cors';
import Fawn from 'fawn';
const app = express();

const blocks = {};
const templateUtil = hbsutils(hbs);
Fawn.init(mongoose);
// export locals ato template
hbs.localsAsTemplateData(app);
app.locals.defaultPageTitle = 'Pcoin';

// view engine setup
templateUtil.registerPartials(`${__dirname}/views/partials`);
templateUtil.registerWatchedPartials(`${__dirname}/views/partials`);
templateUtil.precompilePartials();
hbs.registerPartials(`${__dirname}/views/partials`);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(`${__dirname}/bower_components`));

app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// passport.use(new FacebookStrategy({
//         clientID: FACEBOOK_APP_ID,
//         clientSecret: FACEBOOK_APP_SECRET,
//         callbackURL: "http://localhost:3000/auth/facebook/callback"
//     },
//     function(accessToken, refreshToken, profile, cb) {
//         User.findOrCreate({ facebookId: profile.id }, function(err, user) {
//             return cb(err, user);
//         });
//     }
// ));

// passport.use(new RememberMeStrategy(
//     function(token, done) {
//         Token.consume(token, function(err, user) {
//             if (err) { return done(err); }
//             if (!user) { return done(null, false); }
//             return done(null, user);
//         });
//     },
//     function(user, done) {
//         var token = utils.generateToken(64);
//         Token.save(token, { userId: user._id }, function(err) {
//             if (err) { return done(err); }
//             return done(null, token);
//         });
//     }
// ));

app.use(passport.initialize());
app.use(flash());
app.use(validator());
app.use(toastr());
app.use(passport.session());
// app.use(passport.authenticate('passport-remember-me'));
app.use(express.static(path.join(__dirname, 'public')));


// middleware for toastr
app.use(function(req, res, next) {
    res.locals.toasts = req.toastr.render();
    next();
});

// API routes start
app.use('/', index);
app.use('/seller', seller);
app.use('/bider', bider);
app.use('/register', Register);
// passport account auth

import Account from './models/account';
passport.use(new Strategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


try {
    // mongoose.connect('mongodb://jude:pcoinActivated@pcoin-shard-00-00-xshwr.mongodb.net:27017,pcoin-shard-00-01-xshwr.mongodb.net:27017,pcoin-shard-00-02-xshwr.mongodb.net:27017/pcoin?ssl=true&replicaSet=pcoin-shard-0&authSource=admin&retryWrites=true')
    mongoose.connect('mongodb://localhost/pcoin');

} catch (e) {
    throw e;
}


// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// helper for date format
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

// helper for select tag option
hbs.registerHelper('select', function(selected, options) {
    return options.fn(this).replace(new RegExp(` value=\"${ selected }\"`),
        '$& selected="selected"').replace(new RegExp(`>${ selected }</option>`),
        'selected="selected"$&');
});


// helper use for comparision and operator

hbs.registerHelper({
    eq: (v1, v2) => {
        return v1 === v2;
    },
    ne: (v1, v2) => {
        return v1 !== v2;
    },
    lt: (v1, v2) => {
        return v1 < v2;
    },
    gt: (v1, v2) => {
        return v1 > v2;
    },
    lte: (v1, v2) => {
        return v1 <= v2;
    },
    gte: (v1, v2) => {
        return v1 >= v2;
    },
    and: (v1, v2) => {
        return v1 && v2;
    },
    or: (v1, v2) => {
        return v1 || v2;
    }

});


// Used to increment index
hbs.registerHelper('inc', function(value, options) {
    return parseInt(value) + 1;
});

hbs.registerHelper('JSON', function(value, options) {
    return new hbs.handlebars.SafeString(JSON.stringify(value));
});


// hbs.registerPartials(`${__dirname}/views/partials`, () => {});
// hbs helpers
hbs.registerHelper('link', function(text, options) {
    var attrs = [];

    for (const prop in options.hash) {
        attrs.push(
            `${hbs.handlebars.escapeExpression(prop)}="` +
            `${hbs.handlebars.escapeExpression(options.hash[prop])}"`);
    }

    return new hbs.handlebars.SafeString(
        `<a ${attrs.join(' ')}>${hbs.handlebars.escapeExpression(text)}</a>`
    );
});

// handlebars hellper for block
hbs.registerHelper('block', function(name) {
    const val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
// handlebars helper to extend scripts
hbs.registerHelper('extend', function(name, context) {
    let block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this));
    // for older versions of handlebars, use block.push(context(this));
});


module.exports = app;