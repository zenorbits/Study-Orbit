const express = require('express');
const router = express.Router();
const batchController = require('../controller/batch.controller');

const middleware = require('../middleware/middleware')

router.post('/create', middleware.authMiddleware, middleware.requiredRole(['teacher', 'admin']), batchController.createBatch);
router.get('/allforTeacherbatch', middleware.authMiddleware, middleware.requiredRole(['teacher', 'admin']), batchController.fetchTeacherBatch);
router.get('/pendingbatches', middleware.authMiddleware, middleware.requiredRole(['admin']), batchController.fetchPendingBatch);
router.patch('/:id/status', middleware.authMiddleware, middleware.requiredRole(['admin']), batchController.updateBatchStatus);
router.get('/verifiedbatches', middleware.authMiddleware, batchController.fetchVerifiedBatch);
router.post('/joinbatch', middleware.authMiddleware, batchController.joinBatch);
router.get('/joinedbatches', middleware.authMiddleware, batchController.fetchJoinedBatch);
router.delete('/deletebatch/:id', middleware.authMiddleware, middleware.requiredRole(['admin', 'teacher']), batchController.deleteBatch);

module.exports = router;