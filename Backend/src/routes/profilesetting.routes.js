const express = require('express');
const router = express.Router();
const profileSettingController = require('../controller/profilesetting.controller');
const middleware = require('../middleware/middleware');

router.delete('/deleteprofile',middleware.authMiddleware,profileSettingController.deleteUser);

module.exports = router;