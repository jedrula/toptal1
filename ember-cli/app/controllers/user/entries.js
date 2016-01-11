import Ember from 'ember';


export default Ember.Controller.extend({

  //model() {
  //  debugger;
  //},
  actions: {
    addUserEntry(entryObj) {
      //TODO get user and manage relationsips and save... maybe it would be better not to pushObject here but let ember-data manage it when request is complete - i think it should happen out of the box
      var user = this.get('user');  //setup in setupController in route

      let entry = this.store.createRecord('entry', entryObj);
      user.get('entries').pushObject(entry);
      return entry.save();
    }
  }
});
