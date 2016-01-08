var mongoose = require('mongoose');
var encryption = require('../utils/encryption');

var userSchema = mongoose.Schema({
    identification: {type: String, required: true, unique: true},
    password: {type: String, required: true}    //TODO select false wasnt working for me but maybe there is some way?
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