const productService = require('../../services/product.service');

module.exports = {
  async list(req, res, next) {
    try {
      const items = await productService.getAllProducts();
      return res.render('client/products/list', { title: 'Product - list', items });
    } catch (error) {
      return next(error);
    }
  }
,

  async detail(req, res, next) {
    try {
      const data = await productService.getProductDetail(req.params.id);
      return res.render('client/products/detail', { title: 'Product - detail', product: data.product || null, item: data.product || null, images: data.images || [], relatedProducts: data.relatedProducts || [] });
    } catch (error) {
      return next(error);
    }
  }
,

  async search(req, res, next) {
    try {
      const items = await productService.searchProducts(req.query);
      return res.render('client/products/list', { title: 'Product - search', items });
    } catch (error) {
      return next(error);
    }
  }
,

  async filter(req, res, next) {
    try {
      const items = await productService.filterProducts(req.query);
      return res.render('client/products/list', { title: 'Product - filter', items });
    } catch (error) {
      return next(error);
    }
  }


};
