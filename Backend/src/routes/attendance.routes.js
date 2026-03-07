const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const { markAttendance, getAttendance } = require('../controller/attendance.controller');


router.post("/attendance/batch/:batchId", middleware.authMiddleware, middleware.requiredRole(['admin', 'teacher']), markAttendance);

router.get("/attendance/student/:studentId", middleware.authMiddleware, middleware.requiredRole(['admin', 'teacher']), getAttendance);

module.exports = router