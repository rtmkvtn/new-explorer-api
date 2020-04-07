require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const loginRouter = require('./routes/loginRouter');
const auth = require('./middlewares/auth');
const mainRouter = require('./routes/index');
const wrongAddress = require('./routes/wrongAddress');
const { errorsHandler } = require('./middlewares/errors');
const config = require('./config.js');

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect(config.dbAddress, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .catch((err) => {
    console.error(err);
  });

app.listen(config.PORT, () => {});
//  routes
app.use(limiter);

// logging all requests to request.loq file
app.use(requestLogger);

app.use('/', loginRouter);
// authorization to wright token into cookies.jwt
app.use(auth);

app.use(mainRouter);
// logging all errors to error.log file
app.use(errorLogger);
// errors handlers
app.use(errors());
app.use(wrongAddress);
app.use(errorsHandler);
