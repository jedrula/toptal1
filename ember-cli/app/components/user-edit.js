import Ember from 'ember';
const { inject: { service } } = Ember;

export default Ember.Component.extend({
  shared: service(),
  session: service('session'),
  sessionAccount: service('session-account'),
  hours: null,
  didInitAttrs(obj) {
    var attrs = obj.attrs;
    this.hours = attrs.model.value.get('hours');
  },
  actions: {
    edit() {
      var properties = this.getProperties(['hours']);
      this.attrs.onSave(properties).catch((reason) => {
        this.set('errors', reason.errors);
      });
    }
  }
});
