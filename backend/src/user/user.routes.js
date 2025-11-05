const express = require('express');
const router = express.Router();
const { getUsers, getUserById, deleteUser, me, updateme, changepassword, deleteme } = require('./user.controller');
const { authenticateJWT } = require('../auth/auth.middleware');
const { authentificateAdmin } = require('./user.middleware');

router.get('/me', authenticateJWT, me);
router.put('/updateme', authenticateJWT, updateme);
router.put('/changepassword', authenticateJWT, changepassword);
router.delete('/deleteme', authenticateJWT, deleteme);
router.get('/', authenticateJWT, authentificateAdmin,getUsers);
router.get('/:id', authenticateJWT, authentificateAdmin, getUserById);
router.delete('/:id', authenticateJWT, authentificateAdmin, deleteUser);

module.exports = router;