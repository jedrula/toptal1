var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    identification: {type: String, required: true, unique: true},
    password: {type: String, required: true}    //TODO select false wasnt working for me but maybe there is some way?
});

var userModel = mongoose.model('User',userSchema);

module.exports = userModel;