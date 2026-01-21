const express = require('express');
const router = express.Router();
const batchController = require('../controller/batch.controller');

const middleware = require('../middleware/middleware')

router.post('/create', middleware.authMiddleware, middleware.requiredRole(['teacher']), batchController.createBatch);
router.get('/allforTeacherbatch', middleware.authMiddleware, middleware.requiredRole(['teacher']), batchController.fetchTeacherBatch);
router.get('/pendingbatches', middleware.authMiddleware, middleware.requiredRole(['admin']), batchController.fetchPendingBatch);

module.exports = router;