const svc = require('../../services/supplier.service');
module.exports = {
  async list(req, res, next) { try { const items = await svc.getAll(); res.render('admin/supplier/list', { title: 'Nhà cung cấp', items }); } catch(e){next(e);} },
  async showCreate(req, res, next) { try { res.render('admin/supplier/form', { title: 'Thêm NCC', item: null }); } catch(e){next(e);} },
  async create(req, res, next) { try { await svc.create(req.body); res.redirect('/admin/supplier'); } catch(e){next(e);} },
  async showEdit(req, res, next) { try { const item = await svc.getById(req.params.id); res.render('admin/supplier/form', { title: 'Sửa NCC', item }); } catch(e){next(e);} },
  async update(req, res, next) { try { await svc.update(req.params.id, req.body); res.redirect('/admin/supplier'); } catch(e){next(e);} },
  async delete(req, res, next) { try { await svc.remove(req.params.id); res.redirect('/admin/supplier'); } catch(e){next(e);} }
};
