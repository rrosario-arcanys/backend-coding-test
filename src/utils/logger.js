const winston = require('winston');

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
  ],
});

module.exports = logger;
