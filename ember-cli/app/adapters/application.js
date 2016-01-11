import DS from 'ember-data';
import ENV from 'project-andrzej-swaton-cli/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin,DS.BuildURLMixin, {
  //authorizer: 'authorizer:application'
  authorizer: 'authorizer:token',
  host: ENV.APP.API_SERVER_URL,
  namespace: 'api',

  urlForQuery(queryObj,modelName) {
    if(queryObj.belongsToModel && queryObj.belongsToModelId) {

      var url =  this.urlForFindHasMany(queryObj.belongsToModelId,queryObj.belongsToModel) + '/' + this.pathForType(modelName);
      delete queryObj.belongsToModel;
      delete queryObj.belongsToModelId;
      return url;

      //return this.urlPrefix() + queryObj.buildUrlPath;
    }
    else {
      console.error('add super functionality here');
      throw new Error('implement super functionality');
    }
  },
});
