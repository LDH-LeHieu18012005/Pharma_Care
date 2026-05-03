const cartService = require('../../services/cart.service');

module.exports = {
  async index(req, res, next) {
    try {
      const summary = await cartService.calculateCartSummary(req.session.user.id);
      return res.render('client/cart/index', { title: 'Giỏ hàng', items: summary.items, summary });
    } catch (error) { return next(error); }
  },

  async add(req, res, next) {
    try {
      await cartService.addToCart(req.session.user.id, req.body.product_id, req.body.quantity || 1);
      return res.redirect('/cart');
    } catch (error) { return next(error); }
  },

  async update(req, res, next) {
    try {
      await cartService.updateCartItem(req.session.user.id, req.params.id, req.body.quantity || 1);
      return res.redirect('/cart');
    } catch (error) { return next(error); }
  },

  async remove(req, res, next) {
    try {
      await cartService.removeCartItem(req.session.user.id, req.params.id);
      return res.redirect('/cart');
    } catch (error) { return next(error); }
  },

  async clear(req, res, next) {
    try {
      await cartService.clearCart(req.session.user.id);
      return res.redirect('/cart');
    } catch (error) { return next(error); }
  }
};
