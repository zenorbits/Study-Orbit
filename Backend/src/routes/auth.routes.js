const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const middleware = require('../middleware/middleware');



router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.post('/user/logout', authController.userLogout);

// Role Based navigation in routes



module.exports = router