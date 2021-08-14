require('dotenv').config();
var jwt = require('jsonwebtoken');
const responseHelper = require('./responseHelper');

const authorizeToken = (req, res, next) => {
  // if(requiresAuthorization(req) == false) return next();
  let authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return responseHelper.authError(res, 'Invalid Authentication Token');
      } else {
        req.user = user;
        return next();
      }
    });
  } else {
    return responseHelper.authError(res, 'Invalid Authentication Token');
  }
};

const partialAuthorizeToken = (req, res, next) => {
    // if(requiresAuthorization(req) == false) return next();
    let authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return responseHelper.authError(res, 'Invalid Authentication Token');
        } else {
          req.user = user;
          return next();
        }
      });
    } else {
      return next();
    }
  };
  

module.exports = { authorizeToken, partialAuthorizeToken };
