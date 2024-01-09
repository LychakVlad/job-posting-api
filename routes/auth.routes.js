const Router = require('express');
const router = new Router();
const authController = require('../controller/auth.controller');

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.get('/users', authController.getUsers);

module.exports = router;
