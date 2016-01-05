import DS from 'ember-data';
import ENV from 'project-andrzej-swaton-cli/config/environment';
export default DS.RESTAdapter.extend({
  host: ENV.APP.API_SERVER_URL,
  namespace: 'api'
  //corsWithCredentials: true,????
});
