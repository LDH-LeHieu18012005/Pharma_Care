const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

router.get('/login', auth.showLogin);
router.post('/login', auth.login);
router.get('/logout', auth.logout);

router.get('/change-password', requireAuth, auth.showChangePassword);
router.post('/change-password', requireAuth, auth.changePassword);

module.exports = router;
