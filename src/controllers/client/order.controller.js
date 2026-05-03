const orderService = require('../../services/order.service');

module.exports = {
  async history(req, res, next) {
    try {
      const items = await orderService.getOrdersByUser(req.session.user.id);
      return res.render('client/profile/orders', { title: 'Order - history', items });
    } catch (error) {
      return next(error);
    }
  }
,

  async detail(req, res, next) {
    try {
      const item = await orderService.getOrderDetailByUser(req.session.user.id, req.params.id);
      return res.render('client/profile/orders', { title: 'Order - detail', items: item ? [item] : [], item });
    } catch (error) {
      return next(error);
    }
  }
,

  async cancel(req, res, next) {
    try {
      await orderService.cancelOrderByCustomer(req.session.user.id, req.params.id);
      return res.redirect('/orders');
    } catch (error) {
      return next(error);
    }
  }


};
