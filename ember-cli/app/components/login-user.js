import Ember from 'ember';

export default Ember.Component.extend({
  identification: '',
  password: '',
  actions: {
    login() {
      var properties = this.getProperties(['identification','password']);
      //console.log('register action ',properties);
      this.attrs.onSave(properties);  //TODO handle errors on gui
    }
  }
});
