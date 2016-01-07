//TODO check with current docs
console.log('this is backend for toptal assignment');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json

var jwt = require('express-jwt');
var API_SECRET = require('./utils/token').getApiSecret();
app.use(jwt({ secret: API_SECRET}).unless({path: ['/api/token-auth/']}));  //TODO DRY

//for modulus the host is: http://toptalbackend-57350.onmodulus.net/
var ipaddress = "0.0.0.0";  //TODO assign backend if in production - something like process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
var isDeployedToProduction = !!process.env.PORT;  //TODO make more sophisticated
var port = process.env.PORT || 3000;    //process.env.PORT useful for picking a port when deployed (at the time of writing - modulus)

var database = require('./utils/database');
var uristring = isDeployedToProduction ? 'mongodb://admin:toptal@apollo.modulusmongo.net:27017/anoryT2e' : 'mongodb://localhost/test';
database.connect(uristring);

var userRoute = require('./routes/user');
var tokenAuthRoute = require('./routes/token-auth');
var tokenRefreshRoute = require('./routes/token-refresh');
var routes = [userRoute, tokenAuthRoute, tokenRefreshRoute];   //TODO iterate through all files in routes automatically and add them to the array

//cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //TODO maybe we should be more restrictive
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
  next();
});
//end cors


//TODO setup mongoose with deployed env in mind (modulus probably)
//modulus will pick up the uriString from env
//var uriString = process

app.get('/hello', function (req, res) {
    res.send('Hello World!');
});

var server = app.listen(port,ipaddress,() => {
    var serverAddress = server.address();
    var host = serverAddress.address;
    var port = serverAddress.port;

    routes.forEach((route) => {
        route(app);
    });
    console.log('Backend listening at http://%s:%s',host,port);
});