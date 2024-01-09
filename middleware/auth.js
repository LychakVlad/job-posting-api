const jwt = require('jsonwebtoken');

module.exports = () => {
  return (req, res, next) => {
    console.log('Auth middleware');

    if (req.method === 'OPTIONS') {
      next();
    }

    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).send('Sorry: access denied');
    } else {
      next();
    }
  };
};
