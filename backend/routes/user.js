var express = require('express');
var myServerRouter = express.Router();
var User = require('../models/User');
var encryption = require('../utils/encryption');
var async = require('async');

//TODO make sure that this uses SSL
module.exports = function (app) {
  myServerRouter.post('/', (req, res) => {
    var newUser = new User();
    var payload = req.body.user;
    var identification = payload.identification;

    var password = payload.meta.password;
    newUser.identification = identification;
    //TODO async
    encryption.cryptPassword(password,(err, hash) => {
      console.log('generated pass hash',err,hash);
      //TODO make sure password is not too weak
      if(err) {
        //TODO handle error
        res.status(401).send(err.toString())
      }
      else {

        newUser.password = hash;
        newUser.save((err, user) => {
          console.log('saved callback user',err,user);
          if(err) {
            //TODO handle error
            console.error(err);
            res.status(401).json({
              err: err
            });
          }
          else {
            //TODO add id
            res.status(200).json({
              user: {
                _id: user._id,
                identification: user.identification
              }
            })
          }
        });
      }
    });
  });

  //TODO manage rights to this resource
  myServerRouter.get('/:id', (req, res) => {
    console.log('geting a user');
    User.findById(req.params.id, (err, user) => {
      var status = 200; //asssume it will be OK
      var json = {};
      if(err) {
        status = 500;
        json = err;
      }
      else {
        if(user === null) {
          status = 410;
        }
        else{
          json = {
            user: {
              _id: user._id,
              identification: user.identification
            }
          }
        }
      }
      res.status(status).json(json);
    });
  });


  //TODO allow only for admin and userManager
  myServerRouter.delete('/:id', (req, res) => {
    console.log('deleting a user');
    User.findByIdAndRemove(req.params.id, (err, data) => {
      var status = 200; //asssume it will be OK
      var json = {};
      if(err) {
        status = 500;
        json = err;
      }
      else {
        if(data === null) {
          status = 410;
        }
      }
      res.status(status).json(json);
    });
  });


  app.use('/api/users', myServerRouter);
}