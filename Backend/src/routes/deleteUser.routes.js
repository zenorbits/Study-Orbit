const express = require('express');
const router = express.Router();
const deleteUserControlller = require('../controller/deleteUser.controller');
const middleware = require('../middleware/middleware');


router.delete('/deleteuser/:id', middleware.authMiddleware, middleware.requiredRole(['admin', 'teacher']), deleteUserControlller.deleteUser);

module.exports = router