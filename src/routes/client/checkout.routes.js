const express = require('express');
const router = express.Router();
const checkoutController = require('../../controllers/client/checkout.controller');
const { requireAuth } = require('../../middlewares/auth.middleware');

router.get('/', requireAuth, checkoutController.index);
router.post('/', requireAuth, checkoutController.store);
router.get('/success', requireAuth, checkoutController.success);

module.exports = router;
