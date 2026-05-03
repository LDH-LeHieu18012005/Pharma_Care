const checkoutService = require('../../services/checkout.service');

module.exports = {
  async index(req, res, next) {
    try {
      const summary = await checkoutService.prepareCheckout(req.session.user.id);
      return res.render('client/checkout/index', { title: 'Thanh toán', summary });
    } catch (error) { return next(error); }
  },

  async store(req, res, next) {
    try {
      const result = await checkoutService.createOrderFromCart(req.session.user.id, req.body || {});
      if (!result.ok) return res.render('client/checkout/index', { title: 'Thanh toán', error: result.message, summary: await checkoutService.prepareCheckout(req.session.user.id) });
      return res.redirect('/checkout/success');
    } catch (error) { return next(error); }
  },

  async success(req, res, next) {
    try {
      return res.render('client/checkout/success', { title: 'Đặt hàng thành công' });
    } catch (error) { return next(error); }
  }
};
