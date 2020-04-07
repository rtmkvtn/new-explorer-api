const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const AuthorizationError = require('../errorsModules/AuthorizationError');
const constants = require('../constants');

function auth(req, res, next) {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthorizationError(constants.errors.NO_AUTH);
  }
  req.user = payload;
  return next();
}

module.exports = auth;
