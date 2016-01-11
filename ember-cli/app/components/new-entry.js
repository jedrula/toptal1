import Ember from 'ember';
import moment from 'moment';
const { inject: { service } } = Ember;

export default Ember.Component.extend({
  shared: service(),
  session: service('session'),
  sessionAccount: service('session-account'),
  //session: service(),
  //hours: 0,
  date: new Date(),
  //availableHourOptions: availableHourOptions,
  extraPickadateOptions: {

  },
  actions: {
    //mutdate(dateStr){
    //  var dateWithoutTime = moment(dateStr).startOf('day').toDate();
    //  this.set('date',dateWithoutTime);
    //},
    add() {
      var properties = this.getProperties(['hours','date']);
      properties.hours = properties.hours || 0; //TODO remove
      properties.date = moment(properties.date).startOf('day').toDate();
      this.attrs.onSave(properties).catch((reason) => {
        this.set('errors', reason.errors);
      });
    }
  }
});
