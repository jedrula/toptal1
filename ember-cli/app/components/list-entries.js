import Ember from 'ember';
//import moment from 'moment';
const { inject: { service } } = Ember;

export default Ember.Component.extend({
  session: service('session'),
  sessionAccount: service('session-account'),
  actions: {
    remove(entry) {
      return entry.destroyRecord();
    }
  },
  maxDate: new Date(),
  minDate: new Date(new Date().setDate((new Date()).getDate() - 7)),
  sortProperties: ['date:desc'],
  sortedEntries: Ember.computed.sort('filteredEntries','sortProperties'),
  filteredEntries: Ember.computed.filter('user.entries', function(entry,index,array) {
    //return true;
    var time = entry.get('date').getTime();
    return (time <= this.maxDate.getTime() && time >= this.minDate.getTime());

  }).property('maxDate','minDate','user.entries')
});
