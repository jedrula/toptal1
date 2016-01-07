var express = require('express');
//var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var tokenUtils = require('../utils/token');
var apiTokenRefreshRouter = express.Router();

//TODO it looks like ember-cli does not make the requests to this endpoint when the token expries on the client. Maybe the leeway is needed in config in the client?
module.exports = function(app) {
  apiTokenRefreshRouter.post('/', function(req, res) {
    console.log('verifing jsonwebtoken');
    jwt.verify(req.body.token, API_SECRET, function(err, decoded) {
      if (err) {
        console.log('error occured in jwt.verify',err);
        res
          .status(401)
          .send({
            error: err
          });
      } else {
        var token = tokenUtils.sign(decoded);
        res.status(200).json({
          token: token
        });
      }
    });
  });

  //app.use(bodyParser.json());
  app.use('/api/token-refresh', apiTokenRefreshRouter);
};
