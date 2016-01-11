var jsonapify = require('jsonapify');
var User = require('../models/user');



const userResource = new jsonapify.Resource(User, {
  type: 'users',
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
    identification: new jsonapify.Property('identification'),
    password: {
      value: new jsonapify.Property('password'),
      readable: false
    },
    hours: new jsonapify.Property('hours'),
  },
  //'relationships': {
  //  'entries': new jsonapify.Refs('Entry', 'entries'), //TODO this might be a bug in jsonapify - i think according to jsonapi specs it would make sense if the key was simply 'user' - simillarly to the example from jsonapify README
  //},
  //'relationships': {
  //  'entries': new jsonapify.Property('entries'), //<- this sorts of works - it attaches entities in an array
  //}
});

//registry.add ? - used to work with circular - now i have problems: https://github.com/alex94puchades/jsonapify/pull/3
jsonapify.Runtime.addResource('User', userResource);

module.exports = userResource;  //TODO check if it works - if so maybe also try using import