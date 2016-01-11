import Ember from 'ember';



export default Ember.Route.extend({
  model: function() {
    var userModel = this.modelFor('user');

    return this.store.query('entry',{
      //buildUrlPath: '/users/' + model.id + '/entries'  //TODO fix, this is hacky but couldnt get buildUrl to work in any other way
      belongsToModel: 'user',
      belongsToModelId: userModel.id
    });
    //.then((ret) => {
    //  var entries = ret.get('content');
    //  //debugger;
    //  //model.get('entries').addObjects(entries);
    //});

    //return this.store.query('entry',{
    //  filter: {
    //    user: model.id
    //  }
    //});
  },
  setupController(controller,model) {
    var entriesArr = Ember.$.map(model.content,function(internalModel){
      return internalModel.record
    })
    var userModel = this.modelFor('user');
    controller.set('entries',entriesArr);
    controller.set('user',userModel);
  }
});
