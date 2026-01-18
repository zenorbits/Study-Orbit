// admin.routes.js
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');

// Apply protection to ALL admin routes
router.use(middleware.authMiddleware, middleware.requiredRole(['admin']));

// Now define children freely
router.get('/announcements', (req, res) => {
    res.json({ message: 'Admin Announcements Page' });
});

router.get('/batches', (req, res) => {
    res.json({ message: 'Admin Batches Page' });
});

router.get('/reports', (req, res) => {
    res.json({ message: 'Admin Reports Page' });
});

module.exports = router;