const winston = require('winston');

module.exports = function middleware(app) {
  // Add a logger to our app object for convenience
  Object.assign(app, { logger: winston });

  return (error, req, res, next) => {
    if (error) {
      const message = `${error.code ? `(${error.code}) ` : ''}Route: ${req.url} - ${error.message}`;

      if (error.code === 404) {
        winston.info(message);
      } else {
        winston.error(message);
        winston.info(error.stack);
      }
    }

    next(error);
  };
};
