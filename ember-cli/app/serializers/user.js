import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serialize: function(snapshot, options) {
    var json = this._super(snapshot, options);

    // just a value added to the model that I want to include in the meta data
    json.meta = { password: snapshot.record.get('volatilePassword') };

    return json;
  }
});
