function debugbody(identifier) {
  return (req,res,next) => {  //TODO remove
    console.log('debuging rest: ' + identifier );
    console.log('req.body',req.body);
    next();
  };
}

function logErrors() {
  return (err, req, res, next) => {
    logger.error(err);
    next(err);
  };
}

module.exports = {
  debugbody: debugbody,
  logErrors: logErrors
}