import express from 'express';
import passport from 'passport';
// import Store from '../models/store';
// import Branch from '../models/branch';
import Account from '../models/account';
// import Role from '../models/role';
// import Category from '../models/category';
import Product from '../models/product';
// import formidable from 'formidable';
// import fs from 'fs';
import path from 'path';
import guard from 'connect-ensure-login';
import { check, validationResult } from 'express-validator/check';
import validator from 'express-validator';

import flash from 'connect-flash';

// import Supply from '../models/supply';
// import BranchProduct from '../models/branchProduct';
// import ProductTransfer from '../models/productTransfer';
import Sales from '../models/sales';
import { Types } from 'mongoose';
import product from '../models/product';
// import ProductUpdateHistory from '../models/productUpdateHistory';

const router = express.Router();

router.get('/admin', (req, res) => {
    res.render('user/admin', { layout: 'layouts/user' });
});

router.post('/admin', (req, res, next) => {
    const price = req.body.price;

    const newPrice = req.body;
    Product.save(new Product(newPrice), (err, newPrice) => {
        if (err) {
            console.log(err)
        } else {
            req.flash('info', 'Price saved')
        }
    })

})