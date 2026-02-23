const express = require('express');
const router = express.Router();
const forgotPasswordController = require('../controller/forgotpassword.controller');


router.post('/forgotpassword',forgotPasswordController);

module.exports = router;