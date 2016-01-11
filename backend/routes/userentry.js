var express = require('express');
var myServerRouter = express.Router();
var model = require('../models/entry');
var jsonapify = require('jsonapify');


require('../resources/user');
require('../resources/entry');

//import './user';

//TODO remove debug logger
var logger = require('../utils/logger');
var debugbody = logger.debugbody;
var logErrors = logger.logErrors;

console.warn('we might need to import the User file here for Runtime.addResource action');


module.exports = function (app) {
  myServerRouter.route('/:user_id/entries').get([
    debugbody('geting user entries'),



    jsonapify.enumerate(['Entry', {
      user: jsonapify.param('user_id')  //jsonapify.query('filters'),//filters.user
      //name: jsonapify.param('user'),
    }]),
    function (err, req, res, next) {
      if(err) {//TODO remove
        console.log('errror in jsonapify geting user entries', err);
      }
      //debugger;
      console.log('in here!');
      next(err);
    },
    jsonapify.errorHandler('Entry')
  ]);

  //myServerRouter.get('/', [
  //  jsonapify.enumerate('Entry'),
  //  jsonapify.errorHandler()
  //]);



  app.use('/api/users', myServerRouter);
};