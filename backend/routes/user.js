var express = require('express');
var myServerRouter = express.Router();
var User = require('../models/user');
var encryption = require('../utils/encryption');
var async = require('async');
var tokenUtils = require('../utils/token');
var jsonapify = require('jsonapify');
require('../resources/user');
require('../resources/entry');
//TODO remove debug logger
var logger = require('../utils/logger');
var debugbody = logger.debugbody;
var logErrors = logger.logErrors;



//TODO make sure that this uses SSL




module.exports = function (app) {
  myServerRouter.post('/', [
    debugbody('posting'),
    jsonapify.create('User'),
    function(err, req, res, next) {
                console.log('errror in jsonapify', err);
                next(err);
        },
    jsonapify.errorHandler('User')
  ]);
  /*
  myServerRouter.post('/', (req, res) => {
    var newUser = new User();
    var payload = req.body.user;
    var identification = payload.identification;

    var password = payload.meta.password;
    newUser.identification = identification;
// encryption.cryptPassword(password,(err, hash) => {
// if(err) {
//  console.warn('error 401 cryptPassword', err);
//   res.status(500).send(err.toString())
// }
// else {

//newUser.password = hash;

        newUser.save((err, user) => {
          if(err) {
            //TODO handle error
            const DUPLICATION_CODE = 11000; //TODO maybe this should be elsewhere and tested in some way. In a unlikely case of code changes with mongoose/mongo updates this wont work
            if(err.code === DUPLICATION_CODE) {
              err = {
                errors: [{
                  message: 'you must provide unique identification',
                  attribute: 'identification'
                }]
              }
            }
            res.status(400).json(err);
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


//}
// });
  });
*/



  //TODO manage rights to this resource
  myServerRouter.route('/:id').get([

    //(req,res,next) => {
    //  console.log(jsonapify.param('id'), jsonapify.param('_id'), 'jsonapify params ');
    //
    //  next();
    //},
    //debugbody('get id'),
    jsonapify.read([
      'User', { _id: jsonapify.param('id') }
    ]),
    logErrors,
    jsonapify.errorHandler()
  ]);

  //TODO add delete in the same fashion
  /*
  myServerRouter.get('/:id', tokenUtils.loggedInRoute(), (req, res) => {
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
*/


  //TODO allow only for admin and userManager
  myServerRouter.route('/:id').delete(tokenUtils.loggedInRoute(), (req, res) => {
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
  }).patch([
    (req,res) => {
      var attributes = {};
      var id = req.params.id;
      try {
        attributes = req.body.data.attributes;
        User.update({ _id: id }, { $set: attributes}, (err,updateResult) =>{
          //updateResult.nModified === 0 <- is also true when there were no changes
          if(updateResult.n === 0) {
            res.status(404).end();
          }
          else {
            res.status(204).end();
          }
        });
      }
      catch(e) {
        res.status(400).end();
      }
      //req.body.data.attributes
      //TODO check why jsonapify.modify does not work - seems like sth wrong with jsonpatch
     // debugger;

      //TODO update and send 204 with no content when updated
    }
  ]);


  app.use('/api/users', myServerRouter);
}