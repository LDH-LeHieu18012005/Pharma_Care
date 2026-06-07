const shiftSvc = require('../../services/shift.service');
const assignmentSvc = require('../../services/assignment.service');
const staffSvc = require('../../services/staff.service');

module.exports = {
  // ---- SHIFT ----
  async listShift(req, res, next) {
    try {
      const items = await shiftSvc.getAllShifts();
      res.render('admin/shift/list', { title: 'Quản lý Ca Làm Việc', items });
    } catch (e) { next(e); }
  },
  async showCreateShift(req, res, next) {
    res.render('admin/shift/form', { title: 'Thêm Ca Làm Việc', item: null });
  },
  async createShift(req, res, next) {
    try {
      await shiftSvc.createShift(req.body);
      res.redirect('/admin/shift');
    } catch (e) { next(e); }
  },
  async showEditShift(req, res, next) {
    try {
      const item = await shiftSvc.getShiftById(req.params.id);
      res.render('admin/shift/form', { title: 'Sửa Ca Làm Việc', item });
    } catch (e) { next(e); }
  },
  async updateShift(req, res, next) {
    try {
      await shiftSvc.updateShift(req.params.id, req.body);
      res.redirect('/admin/shift');
    } catch (e) { next(e); }
  },
  async deleteShift(req, res, next) {
    try {
      await shiftSvc.deleteShift(req.params.id);
      res.redirect('/admin/shift');
    } catch (e) { next(e); }
  },

  // ---- ASSIGNMENT ----
  async listAssignment(req, res, next) {
    try {
      const items = await assignmentSvc.getAllWithDetails();
      res.render('admin/assignment/list', { title: 'Phân Công Lịch Làm Việc', items });
    } catch (e) { next(e); }
  },
  async showCreateAssignment(req, res, next) {
    try {
      const shifts = await shiftSvc.getAllShifts();
      const staffs = await staffSvc.getAll();
      res.render('admin/assignment/form', { title: 'Thêm Phân Công', item: null, shifts, staffs });
    } catch (e) { next(e); }
  },
  async createAssignment(req, res, next) {
    try {
      await assignmentSvc.create(req.body);
      res.redirect('/admin/assignment');
    } catch (e) { next(e); }
  },
  async showEditAssignment(req, res, next) {
    try {
      const item = await assignmentSvc.getById(req.params.id);
      const shifts = await shiftSvc.getAllShifts();
      const staffs = await staffSvc.getAll();
      res.render('admin/assignment/form', { title: 'Sửa Phân Công', item, shifts, staffs });
    } catch (e) { next(e); }
  },
  async updateAssignment(req, res, next) {
    try {
      await assignmentSvc.update(req.params.id, req.body);
      res.redirect('/admin/assignment');
    } catch (e) { next(e); }
  },
  async deleteAssignment(req, res, next) {
    try {
      await assignmentSvc.remove(req.params.id);
      res.redirect('/admin/assignment');
    } catch (e) { next(e); }
  }
};
