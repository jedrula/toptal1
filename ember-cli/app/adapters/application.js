import DS from 'ember-data';
import ENV from 'project-andrzej-swaton-cli/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  //authorizer: 'authorizer:application'
  authorizer: 'authorizer:token',
  host: ENV.APP.API_SERVER_URL,
  namespace: 'api',
  // ajaxError: function(jqXHR) {
  //   var error = this._super(jqXHR);
  //   console.log('sss');
  //   debugger;
  //   if (jqXHR && jqXHR.status === 401) {
  //   	debugger;
  //     //#handle the 401 error
  //   }
  //   return error;
  // },

  // handleResponse: function(store, typeClass, payload, id) {
  // 	debugger;
  // }
});
