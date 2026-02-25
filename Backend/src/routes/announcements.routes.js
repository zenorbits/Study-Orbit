const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const { createAnnouncements, getAnnouncements } = require('../controller/announcements.controller');


router.post('/createannouncement', middleware.authMiddleware, middleware.requiredRole(['admin', 'teacher']), createAnnouncements);
router.get('/getannouncement', middleware.authMiddleware, middleware.requiredRole(['admin', 'teacher']), getAnnouncements);


module.exports = router;