var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var API_SECRET = process.env.API_SECRET || 'magic_secret_key';  //TODO add info to Readme that we should pass API_SECRET as env var
if(!API_SECRET) {
  console.warn('missing a secret for jwt');
}
var expiresIn = 10 * 60;//TODO change to sth more reasonable like: 5 * 60




module.exports = {
  sign(user) {
    var token = jwt.sign({
      identification: user.identification,
      scopes: user.scopes
    }, API_SECRET, {
      expiresIn: expiresIn
    });
    return token;
  },
  getApiSecret() {
    return API_SECRET
  },
  loggedInRoute() {
    return expressJwt({ secret: API_SECRET});
  }
}