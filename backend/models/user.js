var mongoose = require('mongoose');
var jsonapify = require('jsonapify');   
var encryption = require('../utils/encryption');

//var Entry = require('./entry');

var schema = mongoose.Schema({
    identification: {type: String, required: true, unique: true},
    password: {type: String, required: true},    //TODO select false wasnt working for me but maybe there is some way?
    hours: {type: Number, required: true, default: 8},
    //entries: [{ type: mongoose.Schema.ObjectId, ref: 'Entry'}]
});

//TODO maybe it would be better if we moved that to middleware to decouple? Although its small enough i think its fine here
schema.pre('save', function(next, done) {
  var user = this;
  console.log('about to save user',user);
  //TODO make sure password is not too weak
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    next();
  } 
  else{
    encryption.cryptPassword(user.password,(err, hash) => {
      if (err) {
        next(err);
      }
      else {
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      }
    }); 
  }
});

//schema.post('find', function(result) {
//  console.log(this instanceof mongoose.Query); // true
//  // prints returned documents
//  console.log('find() returned ' + JSON.stringify(result));
//});



/* TODO not working for some reason - this.password is undefined
userSchema.methods.validPassword = (password, cb) => {
    console.log('compare in userSchema',password,this.password, this);
    console.log(this,'thisUser');
    encryption.validPassword (password,this.password, cb);
};
 */
var userModel = mongoose.model('User',schema);

module.exports = userModel;