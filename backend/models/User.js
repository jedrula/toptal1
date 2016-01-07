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

module.exports = userModel;