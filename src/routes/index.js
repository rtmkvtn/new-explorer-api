const router = require('express').Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const auth = require('../middlewares/auth');
const loginRouter = require('./loginRouter');

router.use('/', loginRouter);
router.use('/', auth);
router.use('/', usersRouter, articlesRouter);

module.exports = router;
