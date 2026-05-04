const svc = require('../../services/medicineType.service');
module.exports = {
  async list(req, res, next) { try { const items = await svc.getAll(); res.render('admin/medicineType/list', { title: 'Loại thuốc', items }); } catch(e){next(e);} },
  async showCreate(req, res, next) { try { res.render('admin/medicineType/form', { title: 'Thêm loại thuốc', item: null }); } catch(e){next(e);} },
  async create(req, res, next) { try { await svc.create(req.body); res.redirect('/admin/medicine-type'); } catch(e){next(e);} },
  async showEdit(req, res, next) { try { const item = await svc.getById(req.params.id); res.render('admin/medicineType/form', { title: 'Sửa loại thuốc', item }); } catch(e){next(e);} },
  async update(req, res, next) { try { await svc.update(req.params.id, req.body); res.redirect('/admin/medicine-type'); } catch(e){next(e);} },
  async delete(req, res, next) { try { await svc.remove(req.params.id); res.redirect('/admin/medicine-type'); } catch(e){next(e);} }
};
