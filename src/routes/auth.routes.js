const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');

router.get('/login', auth.showLogin);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.get('/', (req, res) => res.redirect('/login'));

module.exports = router;
