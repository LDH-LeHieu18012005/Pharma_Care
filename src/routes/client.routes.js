const express = require('express');
const router = express.Router();
const homeController = require('../controllers/client/home.controller');
const cartController = require('../controllers/client/cart.controller');
const chatController = require('../controllers/client/chat.controller');
const upload = require('../middlewares/upload.middleware');

// Home route
router.get('/', homeController.index);

// Product Detail
router.get('/product/:id', homeController.productDetail);

// Search
router.get('/search', homeController.search);

// Chatbot
router.post('/chat', chatController.handleChat);

// Cart
router.get('/cart', cartController.viewCart);
router.post('/cart/add', cartController.addToCart);
router.post('/cart/update', cartController.updateCart);
router.get('/cart/remove/:id', cartController.removeFromCart);

// Checkout
router.get('/checkout', cartController.checkout);
router.post('/checkout', upload.single('prescription_image'), cartController.processCheckout);
router.get('/checkout/success', cartController.checkoutSuccess);

module.exports = router;
