const svc = require('../../services/medicine.service');
const typeSvc = require('../../services/medicineType.service');
const rackSvc = require('../../services/locationRack.service');
module.exports = {
  async list(req, res, next) { try { const items = await svc.getAll(); res.render('admin/medicine/list', { title: 'Quản lý thuốc', items }); } catch(e){next(e);} },
  async showCreate(req, res, next) { try { const types = await typeSvc.getAll(); const racks = await rackSvc.getAll(); res.render('admin/medicine/form', { title: 'Thêm thuốc', item: null, types, racks }); } catch(e){next(e);} },
  async create(req, res, next) { try { await svc.create(req.body); res.redirect('/admin/medicine'); } catch(e){next(e);} },
  async showEdit(req, res, next) { try { const item = await svc.getById(req.params.id); const types = await typeSvc.getAll(); const racks = await rackSvc.getAll(); res.render('admin/medicine/form', { title: 'Sửa thuốc', item, types, racks }); } catch(e){next(e);} },
  async update(req, res, next) { try { await svc.update(req.params.id, req.body); res.redirect('/admin/medicine'); } catch(e){next(e);} },
  async delete(req, res, next) { try { await svc.remove(req.params.id); res.redirect('/admin/medicine'); } catch(e){next(e);} }
};
