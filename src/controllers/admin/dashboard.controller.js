const stats = require('../../services/statistics.service');
module.exports = {
  async index(req, res, next) {
    try {
      const summary = await stats.getSummary();
      const lowStock = await stats.getLowStock(5);
      const expiring = await stats.getExpiringBatches();
      res.render('admin/dashboard', { title: 'Dashboard', summary, lowStock, expiring });
    } catch (e) { next(e); }
  }
};
