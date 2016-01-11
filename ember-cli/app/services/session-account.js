//taken from https://github.com/simplabs/ember-simple-auth/blob/master/tests/dummy/app/services/session-account.js
import Ember from 'ember';

const { inject: { service }, RSVP } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),



  loadCurrentUser() {
    return new RSVP.Promise((resolve, reject) => {
      const id = this.get('session.data.authenticated.user_id');
      if (!Ember.isEmpty(id)) {

        return this.get('store').find('user', id).then((account) => {
          this.set('account', account);
          resolve();
        }, reject);
      } else {
        console.log('is empty id');
        resolve();
      }
    });
  }
});
