require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
const whitelist = ['http://localhost:8080', 'https://fckxyz.github.io', 'https://newsxyz.xyz', 'https://www.newsxyz.xyz'];

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const mainRouter = require('./routes/index');
const wrongAddress = require('./routes/wrongAddress');
const { errorsHandler } = require('./middlewares/errorsHandler');
const config = require('./config.js');

const app = express();

// var allowCrossDomain = function(req, res, next) {
   //  res.header('Access-Control-Allow-Origin', "*");
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// };
// app.configure(function() {
// 	app.use(allowCrossDomain);
// });
// const corsOptions = {
// 	credentials: true,
// origin: (origin, callback) => {
//     if(whitelist.includes(origin))
//       return callback(null, true)
// 
//       callback(new Error('Not allowed by CORS'));
//   }
// };
// app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.MONGO_DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .catch((err) => {
    console.error(err);
  });

app.listen(config.PORT, () => {});
// antiDDOS limiter
app.use(config.limiter);
// logging all requests to request.loq file
app.use(requestLogger);
// login, auth and all other router
app.use('/api', mainRouter);
// logging all errors to error.log file
app.use(errorLogger);
// errors handlers
app.use(errors()); // celebrate's errors handler
app.use(wrongAddress);
app.use(errorsHandler); // custom errors handler
