import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    authenticate(credentials) {
      //var identification = credentials.identification;
      //var password = credentials.password;

      this.get('session').authenticate('authenticator:jwt', credentials).then(() => { //provided by jwt.js in ember-cli-simple-auth-token
        //TODO createRecord user ?
        this.get('session').get('user');
        //TODO transitionToRoute
      });


    }
  }
});
