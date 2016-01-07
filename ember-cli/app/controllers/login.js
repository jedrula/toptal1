import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    authenticate(credentials) {
      //var identification = credentials.identification;
      //var password = credentials.password;

      return this.get('session').authenticate('authenticator:jwt', credentials).then(() => { //provided by jwt.js in ember-cli-simple-auth-token
        //TODO transitionToRoute
      });
    }
  }
});
