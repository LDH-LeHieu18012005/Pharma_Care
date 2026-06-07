const stats = require('../../services/statistics.service');

module.exports = {
  async index(req, res, next) {
    try {
      const year = parseInt(req.query.year) || new Date().getFullYear();
      const summary = await stats.getSummary();
      const lowStock = await stats.getLowStock(5);
      const expiring = await stats.getExpiringBatches();
      const revenueByMonth = await stats.getRevenueByMonth(year);
      const topMedicines = await stats.getTopMedicines(5);
      const salesByStatus = await stats.getSalesByStatus();

      // Danh sách năm để chọn (từ 2023 đến năm hiện tại)
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let y = currentYear; y >= 2023; y--) years.push(y);

      res.render('admin/dashboard', {
        title: 'Tổng quan',
        summary,
        lowStock,
        expiring,
        revenueByMonth,
        topMedicines,
        salesByStatus,
        year,
        years
      });
    } catch (e) { next(e); }
  }
};
