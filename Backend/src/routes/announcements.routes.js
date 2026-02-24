const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const { createAnnouncements } = require('../controller/announcements.controller');


router.post('/createannouncement', middleware.authMiddleware, middleware.requiredRole(['admin', 'teacher']), createAnnouncements);


module.exports = router;