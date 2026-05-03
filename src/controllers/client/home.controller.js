const productService = require('../../services/product.service');

module.exports = {
  async index(req, res, next) {
    try {
      const featuredProducts = await productService.getFeaturedProducts(8);
      const newestProducts = await productService.getNewestProducts(8);
      const promotionProducts = await productService.getPromotionProducts(8);

      return res.render('client/home', {
        title: 'Trang chủ',
        featuredProducts,
        newestProducts,
        promotionProducts
      });
    } catch (error) {
      return next(error);
    }
  }
};
