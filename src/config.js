const {
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
  MONGO_DB_ADDRESS,
} = process.env;
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = {
  PORT,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  MONGO_DB_ADDRESS: NODE_ENV === 'production' ? MONGO_DB_ADDRESS : 'mongodb://localhost:27017/news-explorer-DB',
  limiter,
};
