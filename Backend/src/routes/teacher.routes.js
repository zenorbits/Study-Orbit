// admin.routes.js
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');

// Apply protection to ALL admin routes
router.use(middleware.authMiddleware, middleware.requiredRole(['teacher']));

// Now define children freely
router.get('/announcements', (req, res) => {
    res.json({ message: 'Teacher Announcements Page' });
});

router.get('/batches', (req, res) => {
    res.json({ message: 'Teacher Batches Page' });
});

router.get('/reports', (req, res) => {
    res.json({ message: 'Teacher Reports Page' });
});

module.exports = router;