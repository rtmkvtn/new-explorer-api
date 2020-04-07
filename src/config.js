const { PORT = 3000, NODE_ENV, JWT_SECRET } = process.env;
const dbAddress = 'mongodb://localhost:27017/news-explorer-DB';
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = {
  PORT,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  dbAddress,
  limiter,
};
