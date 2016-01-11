var jsonapify = require('jsonapify');
var model = require('../models/entry');


const resource = new jsonapify.Resource(model, {
  type: 'entries',
  id: {
    value: new jsonapify.Property('_id'),
    writable: false,
  },
  //links: {
  //    self: {
  //        value: new jsonapify.Template('/users/${FirstName}'),
  //        writable: false,
  //    },
  //},
  attributes: {
    hours: new jsonapify.Property('hours'),
    date: new jsonapify.Property('date')
  },
  'relationships': {
    'user.data': new jsonapify.Ref('User', 'user'), //TODO this might be a bug in jsonapify - i think according to jsonapi specs it would make sense if the key was simply 'user' - simillarly to the example from jsonapify README
    //'user': new jsonapify.Ref('User', 'user'),
  },
});

jsonapify.Runtime.addResource('Entry', resource);

module.exports = resource;