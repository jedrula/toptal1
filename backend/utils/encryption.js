var bcrypt = require('bcrypt-nodejs');

exports.cryptPassword = function (password, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err)
      return callback(err);

    bcrypt.hash(password, salt, function (err, hash) {
      return callback(err, hash);
    });

  });
};

exports.comparePassword = function (password, userPassword, callback) {
  bcrypt.compare(password, userPassword, function (err, isPasswordMatch) {
    if (err)
      return callback(err);
    return callback(null, isPasswordMatch);
  });
};

exports.validPassword = (password, userPassword, cb) => {
  console.log('compare in encryption.js',password, userPassword, this);

  exports.comparePassword(password, userPassword, (err, data) => {
    if(data === false) {
      err = 'password mismatch';
    }
    cb(err, data);
  });
};