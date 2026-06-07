const svc = require('../../services/purchaseInvoice.service');
const supplierSvc = require('../../services/supplier.service');
const medSvc = require('../../services/medicine.service');
const batchSvc = require('../../services/batch.service');

module.exports = {
  async list(req, res, next) {
    try {
      const { page = 1, keyword = '', dateFrom = '', dateTo = '' } = req.query;
      const result = await svc.getAllPaginated({ page, limit: 15, keyword, dateFrom, dateTo });
      res.render('admin/purchase/list', {
        title: 'Hóa đơn nhập hàng',
        items: result.rows,
        pagination: result,
        filters: { keyword, dateFrom, dateTo },
        query: req.query,
        baseUrl: '/admin/purchase'
      });
    } catch (e) { next(e); }
  },
  async detail(req, res, next) {
    try {
      const item = await svc.getById(req.params.id);
      const details = await svc.getDetails(req.params.id);
      res.render('admin/purchase/detail', { title: 'Chi tiết Hóa đơn nhập', item, details });
    } catch (e) { next(e); }
  },
  async showCreate(req, res, next) {
    try {
      const suppliers = await supplierSvc.getAll();
      const medicines = await medSvc.getAll();
      res.render('admin/purchase/form', { title: 'Tạo Hóa đơn nhập', suppliers, medicines });
    } catch (e) { next(e); }
  },
  async create(req, res, next) {
    try {
      const purchaseData = { id_supplier: req.body.id_supplier };
      const id_medicines = [].concat(req.body.id_medicine || []);
      const qtys = [].concat(req.body.quantity_in_batch || []);
      const prices = [].concat(req.body.entry_price || []);
      const mfgs = [].concat(req.body.manufacturing_date || []);
      const exps = [].concat(req.body.expiry_date || []);
      const batchIds = [];
      for (let i = 0; i < id_medicines.length; i++) {
        if (id_medicines[i]) {
          const b = await batchSvc.create({
            id_medicine: id_medicines[i],
            quantity_in_batch: qtys[i] || 0,
            entry_price: prices[i] || 0,
            manufacturing_date: mfgs[i] || null,
            expiry_date: exps[i] || null,
            status: 'con_hang'
          });
          if (b.ok) batchIds.push(b.id);
        }
      }
      await svc.create(purchaseData, batchIds);
      res.redirect('/admin/purchase');
    } catch (e) { next(e); }
  },
  async delete(req, res, next) {
    try {
      await svc.remove(req.params.id);
      res.redirect('/admin/purchase');
    } catch (e) { next(e); }
  }
};
