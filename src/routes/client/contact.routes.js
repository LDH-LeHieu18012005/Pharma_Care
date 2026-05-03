const express = require('express');
const router = express.Router();
const contactController = require('../../controllers/client/contact.controller');

router.get('/', contactController.showForm);
router.post('/', contactController.submit);

module.exports = router;
