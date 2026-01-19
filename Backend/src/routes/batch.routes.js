const express = require('express');
const router = express.Router();
const batchController = require('../controller/batch.controller');

const middleware = require('../middleware/middleware')

router.post('/create',middleware.authMiddleware,middleware.requiredRole(['teacher']),batchController.createBatch);
router.get('/mybatch',middleware.authMiddleware,middleware.requiredRole(['teacher']),batchController.fetchTeacherBatch);

module.exports = router;