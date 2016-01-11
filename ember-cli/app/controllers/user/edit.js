import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    editUser(properties) {
      var self = this;

      var userModel = this.get('model');

      userModel.setProperties(properties);  //var userModel
      return userModel.save().then(() => {
        self.transitionToRoute('user.entries',userModel);
      })
    }
  }
});
