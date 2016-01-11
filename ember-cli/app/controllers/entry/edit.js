import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    editUserEntry(properties) {
      var self = this;

      var entryModel = this.get('model');

      entryModel.setProperties(properties);
      return entryModel.save().then((retEntryModel) => {
        var userModel = entryModel.get('user')
        self.transitionToRoute('user.entries',userModel);
      })
    }
  }
});
