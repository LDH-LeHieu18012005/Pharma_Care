const svc = require('../../services/salesInvoice.service');
const custSvc = require('../../services/customer.service');
const medSvc = require('../../services/medicine.service');
module.exports = {
  async list(req, res, next) { try { const items = await svc.getAll(); res.render('admin/sales/list', { title: 'Hóa đơn bán', items }); } catch(e){next(e);} },
  async detail(req, res, next) { try { const item = await svc.getById(req.params.id); const details = await svc.getDetails(req.params.id); res.render('admin/sales/detail', { title: 'Chi tiết HĐ', item, details }); } catch(e){next(e);} },
  async showCreate(req, res, next) { try { const customers = await custSvc.getAll(); const medicines = await medSvc.getAll(); res.render('admin/sales/form', { title: 'Tạo hóa đơn', customers, medicines }); } catch(e){next(e);} },
  async create(req, res, next) {
    try {
      const items = [];
      const ids = [].concat(req.body.id_medicine || []);
      const qtys = [].concat(req.body.quantity_sales || []);
      const prices = [].concat(req.body.price || []);
      for (let i = 0; i < ids.length; i++) { if (ids[i]) items.push({ id_medicine: ids[i], quantity_sales: qtys[i] || 1, price: prices[i] || 0 }); }
      await svc.create({ id_staff: req.session.user.id, id_customer: req.body.id_customer }, items);
      res.redirect('/admin/sales');
    } catch(e){next(e);}
  },
  async delete(req, res, next) { try { await svc.remove(req.params.id); res.redirect('/admin/sales'); } catch(e){next(e);} }
};
