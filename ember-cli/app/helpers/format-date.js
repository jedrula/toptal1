import Ember from 'ember';
import moment from 'moment';

export function formatDate(params/*, hash*/) {
  var dateObj = params[0];
  return moment(dateObj).format('MM/DD/YYYY');
}

export default Ember.Helper.helper(formatDate);
