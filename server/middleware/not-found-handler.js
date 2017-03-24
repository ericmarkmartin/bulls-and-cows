const errors = require('feathers-errors');

module.exports = function middleware() {
  return (req, res, next) => {
    next(new errors.NotFound('Page not found'));
  };
};
