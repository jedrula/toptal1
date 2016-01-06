import DS from 'ember-data';
import ENV from 'project-andrzej-swaton-cli/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  //authorizer: 'authorizer:application'
  authorizer: 'authorizer:token',
  host: ENV.APP.API_SERVER_URL,
  namespace: 'api'
});
