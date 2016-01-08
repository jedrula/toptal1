var mongoose = require('mongoose');
var jsonapify = require('jsonapify');   
var encryption = require('../utils/encryption');

var userSchema = mongoose.Schema({
    identification: {type: String, required: true, unique: true},
    password: {type: String, required: true}    //TODO select false wasnt working for me but maybe there is some way?
});

//TODO maybe it would be better if we moved that to middleware to decouple? Although its small enough i think its fine here
userSchema.pre('save', function(next) {
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

/* TODO not working for some reason - this.password is undefined
userSchema.methods.validPassword = (password, cb) => {
    console.log('compare in userSchema',password,this.password, this);
    console.log(this,'thisUser');
    encryption.validPassword (password,this.password, cb);
};
 */
var userModel = mongoose.model('User',userSchema);



var userResource = new jsonapify.Resource(userModel, {
    type: 'users',
    id: {
        value: new jsonapify.Property('_id'),
        writable: false,
    },
    //links: {
    //    self: {
    //        value: new jsonapify.Template('/users/${FirstName}'),
    //        writable: false,
    //    },
    //},
    attributes: {
        identification: new jsonapify.Property('identification'),
        password: new jsonapify.Property('password'),   //TODO maybe use a hash and add readable: false ? as in Readme example: https://github.com/alex94puchades/jsonapify
    },
});

jsonapify.Runtime.addResource('User', userResource);

module.exports = userModel;