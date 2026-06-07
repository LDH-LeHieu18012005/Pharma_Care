const svc = require('../../services/staff.service');
module.exports = {
  async list(req, res, next) { try { const items = await svc.getAll(); res.render('admin/staff/list', { title: 'Nhân viên', items }); } catch(e){next(e);} },
  async showCreate(req, res, next) { try { res.render('admin/staff/form', { title: 'Thêm NV', item: null }); } catch(e){next(e);} },
  async create(req, res, next) { try { if(req.file) req.body.images = '/uploads/' + req.file.filename; await svc.create(req.body); res.redirect('/admin/staff'); } catch(e){next(e);} },
  async showEdit(req, res, next) { try { const item = await svc.getById(req.params.id); res.render('admin/staff/form', { title: 'Sửa NV', item }); } catch(e){next(e);} },
  async update(req, res, next) { try { if(req.file) req.body.images = '/uploads/' + req.file.filename; await svc.update(req.params.id, req.body); res.redirect('/admin/staff'); } catch(e){next(e);} },
  async delete(req, res, next) { try { await svc.remove(req.params.id); res.redirect('/admin/staff'); } catch(e){next(e);} }
};
