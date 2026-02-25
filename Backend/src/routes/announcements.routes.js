const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const { createAnnouncements, getAnnouncements,deleteAnnouncements } = require('../controller/announcements.controller');


router.post('/createannouncement', middleware.authMiddleware, middleware.requiredRole(['admin', 'teacher']), createAnnouncements);
router.get('/getannouncement', middleware.authMiddleware, getAnnouncements);
router.delete('/deleteannouncments',middleware.authMiddleware,middleware.requiredRole(['admin','teacher']),deleteAnnouncements);


module.exports = router;