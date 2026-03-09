const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const { createAssignment, getAssignment, deleteAssignment, getAssignmentsByBatch } = require('../controller/assignment.controller');

router.post('/:id/createAssignment', middleware.authMiddleware, middleware.requiredRole(['admin', 'teacher']), createAssignment);
router.get('/getassignment', middleware.authMiddleware, getAssignment);
router.delete('/deleteassignment', middleware.authMiddleware, middleware.requiredRole(['admin', 'teacher']), deleteAssignment);
router.get('/:batchId/batchassignment', middleware.authMiddleware, getAssignmentsByBatch);

module.exports = router