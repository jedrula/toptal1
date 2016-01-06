var express = require('express');
var myServerRouter = express.Router();
var User = require('../models/User');
var encryption = require('../utils/encryption');
var async = require('async');
var jwt = require('jsonwebtoken');
var API_SECRET = process.env.API_SECRET || 'magic_secret_key';  //TODO add info to Readme that we should pass API_SECRET as env var

if(!API_SECRET) {
  console.warn('missing a secret for jwt');
}

//TODO make sure that this uses SSL
module.exports = function (app) {
  myServerRouter.post('/', (req, res) => {
    var payload = req.body;
    var identification = payload.identification;
    var password = payload.password;

    async.waterfall([
      (cb) =>
      {
        User.findOne({
          identification: identification
        }, (userFindErr, user) => {
          if (!user && !userFindErr) {
            userFindErr = 'User not found';
          }

          cb(userFindErr, user);
        });
      },
      (user, cb) =>
      {
        //console.log('stage 2', arguments);
        console.log('found one userr prev id: ', user.password);
        encryption.validPassword(password, user.password, (err) =>{
          cb(err,user); //pass the user further if there was no error
        });
      }
    ], (err, user) => {
      console.log('final data', user);
      if(err) {
        console.warn('authentication error', err);
        res.status(401).end();
      }
      else {
        //TODO send roles like admin or userAdmin
        var token = jwt.sign({
          identification: user.identification,
          scopes: user.scopes
        }, API_SECRET, {
          expiresIn: 5 * 60
        });
        res.status(200).json({
          token: token
        })
      }
    });
  });




  app.use('/api/token-auth', myServerRouter);
}