import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    authenticate(credentials) {
      console.log('auth with credentials',credentials);
      //var identification = credentials.identification;
      //var password = credentials.password;

      this.get('session').authenticate('authenticator:jwt', credentials);//provided by jwt.js in ember-cli-simple-auth-token


    }
  }
});
