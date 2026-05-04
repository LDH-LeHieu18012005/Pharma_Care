const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth.middleware');
const { requireAdmin, requireAdminOrStaff } = require('../middlewares/role.middleware');
const m = (f) => [requireAuth, requireAdminOrStaff, f];
const mAdmin = (f) => [requireAuth, requireAdmin, f];

const dashboard = require('../controllers/admin/dashboard.controller');
const medicine = require('../controllers/admin/medicine.controller');
const medicineType = require('../controllers/admin/medicineType.controller');
const supplier = require('../controllers/admin/supplier.controller');
const customer = require('../controllers/admin/customer.controller');
const staff = require('../controllers/admin/staff.controller');
const sales = require('../controllers/admin/sales.controller');
const batch = require('../controllers/admin/batch.controller');
const rack = require('../controllers/admin/rack.controller');

router.get('/', ...m(dashboard.index));

router.get('/medicine', ...m(medicine.list));
router.get('/medicine/create', ...m(medicine.showCreate));
router.post('/medicine/create', ...m(medicine.create));
router.get('/medicine/edit/:id', ...m(medicine.showEdit));
router.post('/medicine/edit/:id', ...m(medicine.update));
router.post('/medicine/delete/:id', ...m(medicine.delete));

router.get('/medicine-type', ...m(medicineType.list));
router.get('/medicine-type/create', ...m(medicineType.showCreate));
router.post('/medicine-type/create', ...m(medicineType.create));
router.get('/medicine-type/edit/:id', ...m(medicineType.showEdit));
router.post('/medicine-type/edit/:id', ...m(medicineType.update));
router.post('/medicine-type/delete/:id', ...m(medicineType.delete));

router.get('/rack', ...m(rack.list));
router.get('/rack/create', ...m(rack.showCreate));
router.post('/rack/create', ...m(rack.create));
router.get('/rack/edit/:id', ...m(rack.showEdit));
router.post('/rack/edit/:id', ...m(rack.update));
router.post('/rack/delete/:id', ...m(rack.delete));

router.get('/supplier', ...m(supplier.list));
router.get('/supplier/create', ...m(supplier.showCreate));
router.post('/supplier/create', ...m(supplier.create));
router.get('/supplier/edit/:id', ...m(supplier.showEdit));
router.post('/supplier/edit/:id', ...m(supplier.update));
router.post('/supplier/delete/:id', ...m(supplier.delete));

router.get('/customer', ...m(customer.list));
router.get('/customer/create', ...m(customer.showCreate));
router.post('/customer/create', ...m(customer.create));
router.get('/customer/edit/:id', ...m(customer.showEdit));
router.post('/customer/edit/:id', ...m(customer.update));
router.post('/customer/delete/:id', ...m(customer.delete));

router.get('/staff', ...mAdmin(staff.list));
router.get('/staff/create', ...mAdmin(staff.showCreate));
router.post('/staff/create', ...mAdmin(staff.create));
router.get('/staff/edit/:id', ...mAdmin(staff.showEdit));
router.post('/staff/edit/:id', ...mAdmin(staff.update));
router.post('/staff/delete/:id', ...mAdmin(staff.delete));

router.get('/sales', ...m(sales.list));
router.get('/sales/create', ...m(sales.showCreate));
router.post('/sales/create', ...m(sales.create));
router.get('/sales/:id', ...m(sales.detail));
router.post('/sales/delete/:id', ...m(sales.delete));

router.get('/batch', ...m(batch.list));
router.get('/batch/create', ...m(batch.showCreate));
router.post('/batch/create', ...m(batch.create));
router.post('/batch/delete/:id', ...m(batch.delete));

module.exports = router;
