const express = require('express');
const router = express.Router();


router.use('/admin', require('./admin.routes'));
router.use('/teacher', require('./teacher.routes'));
router.use('/parent', require('./parent.routes'));
router.use('/student', require('./student.routes'));


module.exports = router