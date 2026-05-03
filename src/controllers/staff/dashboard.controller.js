const dashboardService = require('../../services/statistics.service');

module.exports = {
  async index(req, res, next) {
    try {
      const items = await dashboardService.index();
      return res.render('staff/dashboard', { title: 'Dashboard - index', items });
    } catch (error) {
      return next(error);
    }
  }


};
