import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveModel(data) {
      console.log('data in controller saveModel',data);
      var identification = data.identification;
      var password = data.password;
      delete data.password; //do not even pass password to createUser func
      var user = this.store.createRecord('user', data);

      //sets password for serializer as here: http://stackoverflow.com/questions/22774111/login-after-successful-signup-ember-simple-auth
      user.set('volatilePassword', password);
      //TODO handle error!
      //TODO login and redirect somewhere
      return user.save().then(function() {
        /*
        this.get('session').authenticate('app:authenticators:custom', {
          identification: identification,
          password: password
        });
        */
      });

    }
  }
});
