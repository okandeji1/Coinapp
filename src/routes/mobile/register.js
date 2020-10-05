import express from 'express';
import Account from '../../models/account';
import fs from 'fs';
// import Fawn from 'fawn';
var jwt = require('jsonwebtoken');
var verifyToken = require('../../helpers/verifyToken');

const router = express.Router();

router.post('/addUser', async (req, res) => {

  console.log(req.body);
  const findShortCode = await Account.findOne({ username: req.body.username });
  const emailCheck = await Account.findOne({ email: req.body.email });
  if (findShortCode) {
    return res.json({ msg: 'Username already exist', head: 'exist' });
  }

  if (emailCheck) {
    return res.json({ msg: 'Email already exist', head: 'exist' });
  }
  const newAdmin = req.body;
  const password = req.body.password;
  delete newAdmin.password;

  newAdmin.roleId = 'user';
  newAdmin.username = req.body.username;
  newAdmin.phone = req.body.phone;
  newAdmin.email = req.body.email;

  Account.register(new Account(newAdmin), password,
                   async (err, account) => {
                     const accountId = String(account._id);
                     console.log(account);
                     if (err) {
                       console.log(err);
                     }
                     // Account.findByIdAndUpdate(account._id, { token: jwt.sign(accountId, 'cube7000Activated')});
                     Account.findById(accountId, async function(err, doc) {
                       const tokenG = await Account.findById(account._id);
                       tokenG.token = await jwt.sign({ id: account._id }, 'pCoinActivated');
                       await tokenG.save(function(err) {
                         if (err) {
                           console.log(err);
                         }
                       });
                       // });
                       if (err) {
                         console.log(err);
                       } else {
                         return res.json({ msg: 'User has been created', head: 'success' });
                       }
                     });
                   });
});
export default router;
