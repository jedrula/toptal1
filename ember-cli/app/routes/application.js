//taken from https://github.com/simplabs/ember-simple-auth/blob/master/tests/dummy/app/routes/application.js
import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
  sessionAccount: service('session-account'),

  beforeModel() {
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser().catch(() => this.get('session').invalidate());
    var id = this.get('session.data.authenticated.user_id');
    this.transitionTo('user.entries',id);
  },

  _loadCurrentUser() {
    return this.get('sessionAccount').loadCurrentUser();
  }
});
