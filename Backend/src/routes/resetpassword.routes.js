const express = require('express');
const router = express.Router();
const resetPasswordController = require('../controller/resetpassword.controller');

router.post('/resetpassword',resetPasswordController);

module.exports = router;