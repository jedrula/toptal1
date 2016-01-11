import Ember from 'ember';

export function entryColor(params/*, hash*/) {
  var user = params[0];
  var entry = params[1];
  var userHours = user.get('hours');
  var entryHours = entry.get('hours');
  return userHours <= entryHours ? 'list-group-item-success': 'list-group-item-danger';
}

export default Ember.Helper.helper(entryColor);
