import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('user', {
    path: 'user/:user_id'
  }, function() {
    this.route('entries', {
      path: 'entries'
    });
  });
});

export default Router;
