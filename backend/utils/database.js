var mongoose = require('mongoose');

module.exports = {
  connect(uristring) {
    mongoose.connect(uristring);

// When successfully connected
    mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection open to ' + uristring);
    });

// If the connection throws an error
    mongoose.connection.on('error',function (err) {
      console.log('Mongoose default connection error: ' + err);
    });

// When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose default connection disconnected');
    });

// If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
      mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });
//mongo console: mongo apollo.modulusmongo.net:27017/anoryT2e -u admin -p toptal
  }
}
