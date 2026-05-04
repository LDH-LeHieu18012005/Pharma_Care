const svc = require('../../services/batch.service');
const medSvc = require('../../services/medicine.service');
module.exports = {
  async list(req, res, next) { try { const items = await svc.getAll(); res.render('admin/batch/list', { title: 'Lô hàng', items }); } catch(e){next(e);} },
  async showCreate(req, res, next) { try { const medicines = await medSvc.getAll(); res.render('admin/batch/form', { title: 'Thêm lô hàng', item: null, medicines }); } catch(e){next(e);} },
  async create(req, res, next) { try { await svc.create(req.body); res.redirect('/admin/batch'); } catch(e){next(e);} },
  async delete(req, res, next) { try { await svc.remove(req.params.id); res.redirect('/admin/batch'); } catch(e){next(e);} }
};
