const jwt = require('jsonwebtoken');

module.exports = () => {
  return (req, res, next) => {
    console.log('Auth middleware');
    next();
  };
};
