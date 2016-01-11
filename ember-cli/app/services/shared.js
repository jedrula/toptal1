import Ember from 'ember';




export default Ember.Service.extend({
  availableHourOptions: [],
  init() {
    this._super(...arguments);

    var availableHourOptions = [];
    for(var i=0;i<25;i++) {
      availableHourOptions.push(i);
    }

    this.set('availableHourOptions', availableHourOptions);
  }
});
