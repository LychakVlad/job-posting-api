const Router = require('express');
const router = new Router();
const authController = require('../controller/auth.controller');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post(
  '/registration',
  [
    check('username', "Username can't be empty").notEmpty(),
    check(
      'password',
      'Password must be more than 4 and less than 10 symbols'
    ).isLength({ min: 4, max: 10 }),
  ],
  authController.registration
);
router.post('/login', authController.login);
router.get(
  '/users',
  roleMiddleware(['admin']),
  authMiddleware,
  authController.getUsers
);

module.exports = router;
