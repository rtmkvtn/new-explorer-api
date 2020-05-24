const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const escape = require('escape-html');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');
const AuthorizationError = require('../errorsModules/AuthorizationError');
const ConflictError = require('../errorsModules/ConflictError');
const constants = require('../constants');

// avoiding undefined and special symbols in user's input
const noSymbols = (input) => (escape(input) === 'undefined' ? '' : escape(input));

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password } = req.body;
  const name = noSymbols(req.body.name);

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name: escape(name), email, password: hash }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.message.includes('unique')) {
        return next(new ConflictError(constants.errors.DUPL_EMAIL));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new AuthorizationError(constants.errors.AUTHORIZATION_ERROR);
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 7 * 24 * 60 * 60000,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch(next);
};
