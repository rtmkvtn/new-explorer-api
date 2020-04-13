const router = require('express').Router();
const NotFoundError = require('../errorsModules/NotFoundError');
const constants = require('../constants');

router.all('*', (req, res, next) => next(new NotFoundError(constants.errors.NOT_FOUND)));

module.exports = router;
