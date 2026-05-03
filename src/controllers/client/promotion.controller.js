const promotionService = require('../../services/promotion.service');

module.exports = {
  async index(req, res, next) {
    try {
      const items = await promotionService.getAllPromotions();
      return res.render('client/promotions', { title: 'Promotion - index', items });
    } catch (error) {
      return next(error);
    }
  }
,

  async detail(req, res, next) {
    try {
      const item = await promotionService.getPromotionById(req.params.id);
      return res.render('client/promotions', { title: 'Promotion - detail', item });
    } catch (error) {
      return next(error);
    }
  }


};
