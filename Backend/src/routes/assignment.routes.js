const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const { createAssignment, getAssignment } = require('../controller/assignment.controller');

router.post('/createAssignment', middleware.authMiddleware, middleware.requiredRole(['admin', 'teacher']), createAssignment);
router.get('/getassignment', middleware.authMiddleware, getAssignment);

module.exports = router