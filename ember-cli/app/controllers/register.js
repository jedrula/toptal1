import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveModel(data) {
      console.log('data in controller saveModel',data);
      //TODO check if password is not stored in the client - it shouldnt be!
      var identification = data.identification;
      var password = data.password;
      delete data.password;
      var user = this.store.createRecord('user', data);

      //TODO set password for serializer as here: http://stackoverflow.com/questions/22774111/login-after-successful-signup-ember-simple-auth
      user.set('volatilePassword', password);
      //TODO handle error!
      user.save().then(function() {
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
