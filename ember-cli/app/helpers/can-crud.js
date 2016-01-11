import Ember from 'ember';
const { inject: { service } } = Ember;

export function canCrud(params/*, hash*/) {

  var currentUser = params[0];
  var isAdmin = currentUser.get('admin');
  var owner = params[1];
  return isAdmin || currentUser.get('id') === owner;
}

export default Ember.Helper.helper(canCrud);
