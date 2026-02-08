const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const middleware = require('../middleware/middleware');
const {verifyOtp} = require('../services/otp.services')


router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.post('/user/logout', authController.userLogout);

//opt path

router.post('/user/verify-otp',verifyOtp);



module.exports = router