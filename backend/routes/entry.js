var express = require('express');
var myServerRouter = express.Router();
var model = require('../models/entry');
var jsonapify = require('jsonapify');
var tokenUtils = require('../utils/token');

require('../resources/user');
require('../resources/entry');

//import './user';

//TODO remove debug logger
var logger = require('../utils/logger');
var debugbody = logger.debugbody;
var logErrors = logger.logErrors;

console.warn('we might need to import the User file here for Runtime.addResource action');



//TODO probably can remove this unsuccesfull attempt - will take care of that in mongoose middleaware
//function manageCreatedEntry(transaction){
//   transaction.subscribe(transaction.resource.type, 'end', function(resource) {
//      console.log(transaction);
//      var newEntryId = resource._model().get('id'); //TODO im not sure how safe is that - looks like using some private properties, might change with an update of jsonapify
//      debugger;
//    });
//
//}
//END OF TODO

module.exports = function (app) {
  myServerRouter.post('/', [
    debugbody('posting entry'),
    jsonapify.create('Entry'),
    function (err, req, res, next) {
      if(err) {//TODO remove
      console.log('errror in jsonapify posting entry', err);
      }
      //debugger;
      console.log('in here!');
      next(err);
    },
    jsonapify.errorHandler('Entry')
  ]);

  myServerRouter.route('/').get([
    jsonapify.enumerate(['Entry', {
      //user: '568c69ac11ab3f60064d522f'  //jsonapify.query('filters'),//filters.user
      //name: jsonapify.param('user'),
    }]),
    jsonapify.errorHandler()
  ]);

  myServerRouter.route('/:id').delete([
    tokenUtils.loggedInRoute(),
    jsonapify.remove(['Entry',jsonapify.param('id')]),
    jsonapify.errorHandler()
  ]).get([
    jsonapify.read(['Entry',jsonapify.param('id')]),
    jsonapify.errorHandler()
  ]).patch([
    jsonapify.update(['Entry',jsonapify.param('id')]),
    jsonapify.errorHandler()
  ]);



  app.use('/api/entries', myServerRouter);
};