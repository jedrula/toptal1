var mongoose = require('mongoose');

//var User = require('./User');

var schema = mongoose.Schema({
  hours: {type: Number, required: true},
  date: {type: Date, required: true},
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',  //TODO maybe this is not really needed... maybe it would rather be simply user_id ?
  }
});

/*
schema.pre('save', function(next,done) {

  // Don't do anything unless this is a new entity being created
  if (!this.isNew) {
    return next();
  }

  //var query = { _id: new ObjectId(campaign._id) };
  var searchById = this._doc.user[0].toString();  //TODO this seems very tricky, maybe there is some method?
debugger;
  //User.find({
  //  _id: searchById
  //},function(){
  //  debugger;
  //});
  //
  //User.find({
  //  _id: this._doc.user[0]
  //},function(){
  //  debugger;
  //});

  User.update({_id: searchById}, {
      $push: {entries: this._id}
    },function(err, raw){
      next();//TODO maybe this could be elsewhere as its just kicking off a parallel call
      done(err,raw);  //TODO im not sure if we should not make sure that if err exists its NOT A STRING. IF it is it should be changed to new Error(err) <- they SHOUT about it in mognoose docs http://mongoosejs.com/docs/middleware.html
    //debugger;//TODO add next and handle
  });
    //.then(function() {
    //  debugger;
    //  next();
    //})
    //.then(null, function(err) {
    //  debugger;
    //  // Whoops! Something broke. You may want to abort this update.
    //  next(err);
    //});
});
*/

var model = mongoose.model('Entry',schema);
module.exports = model;