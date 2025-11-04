const express = require('express');
const router = express.Router();
const { getUsers, getUserById } = require('./user.controller');
const { authenticateJWT } = require('../auth/auth.middleware');


router.get('/', authenticateJWT, getUsers);
router.get('/:id', authenticateJWT, getUserById);

module.exports = router;