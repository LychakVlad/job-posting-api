const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = function (userRoles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers.authorization.split(' ')[1];

      if (!token) {
        return res.status(403).json({ message: 'User is not authenticated' });
      }

      const { role } = jwt.verify(token, secret);
      let hasRole = false;

      userRoles.forEach((itemRole) => {
        if (role === itemRole) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        return res.status(403).json({ message: "You don't have an access" });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: 'User is not authenticated' });
    }
  };
};
