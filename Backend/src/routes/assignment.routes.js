const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const { createAssignment, getAssignment, deleteAssignment } = require('../controller/assignment.controller');

router.post('/createAssignment', middleware.authMiddleware, middleware.requiredRole(['admin', 'teacher']), createAssignment);
router.get('/getassignment', middleware.authMiddleware, getAssignment);
router.delete('/deleteassignment', middleware.authMiddleware, middleware.requiredRole(['admin', 'teacher']), deleteAssignment);

module.exports = router