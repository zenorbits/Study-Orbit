const express = require('express');
const router = express.Router();
const fetchUserController = require('../controller/fetchUser.controller');
const middleware = require('../middleware/middleware');

router.get('/students', middleware.authMiddleware, fetchUserController.fetchStudent);
router.get('/teachers', middleware.authMiddleware, fetchUserController.fetchTeacher);
router.get('/profileinfo',middleware.authMiddleware,fetchUserController.fetchProfileInfo);

module.exports = router