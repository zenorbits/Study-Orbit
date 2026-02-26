const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const {createAssignment} = require('../controller/assignment.controller');

router.post('/createAssignment',middleware.authMiddleware,middleware.requiredRole(['admin','teacher']),createAssignment);

module.exports = router