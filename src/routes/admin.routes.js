const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth.middleware');
const { requireAdmin, requireAdminOrStaff } = require('../middlewares/role.middleware');
const m = (f) => [requireAuth, requireAdminOrStaff, f];
const mAdmin = (f) => [requireAuth, requireAdmin, f];

const upload = require('../middlewares/upload.middleware');

const dashboard = require('../controllers/admin/dashboard.controller');
const medicine = require('../controllers/admin/medicine.controller');
const medicineType = require('../controllers/admin/medicineType.controller');
const supplier = require('../controllers/admin/supplier.controller');
const customer = require('../controllers/admin/customer.controller');
const staff = require('../controllers/admin/staff.controller');
const sales = require('../controllers/admin/sales.controller');
const batch = require('../controllers/admin/batch.controller');
const rack = require('../controllers/admin/rack.controller');
const purchase = require('../controllers/admin/purchase.controller');
const shift = require('../controllers/admin/shift.controller');
const exportCtrl = require('../controllers/admin/export.controller');

router.get('/', ...m(dashboard.index));

// Export routes
router.get('/export/medicine/excel', ...m(exportCtrl.exportMedicineExcel));
router.get('/export/sales/excel', ...m(exportCtrl.exportSalesExcel));
router.get('/export/sales/pdf', ...m(exportCtrl.exportSalesPDF));
router.get('/export/purchase/excel', ...m(exportCtrl.exportPurchaseExcel));
router.get('/export/customer/excel', ...m(exportCtrl.exportCustomerExcel));
router.get('/export/supplier/excel', ...m(exportCtrl.exportSupplierExcel));
router.get('/export/batch/excel', ...m(exportCtrl.exportBatchExcel));
router.get('/export/report/excel', ...m(exportCtrl.exportReportExcel));

router.get('/medicine', ...m(medicine.list));
router.get('/medicine/create', ...m(medicine.showCreate));
router.post('/medicine/create', requireAuth, requireAdminOrStaff, upload.single('image_file'), medicine.create);
router.get('/medicine/edit/:id', ...m(medicine.showEdit));
router.post('/medicine/edit/:id', requireAuth, requireAdminOrStaff, upload.single('image_file'), medicine.update);
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
router.post('/staff/create', requireAuth, requireAdmin, upload.single('image_file'), staff.create);
router.get('/staff/edit/:id', ...mAdmin(staff.showEdit));
router.post('/staff/edit/:id', requireAuth, requireAdmin, upload.single('image_file'), staff.update);
router.post('/staff/delete/:id', ...mAdmin(staff.delete));

router.get('/sales', ...m(sales.list));
router.get('/sales/create', ...m(sales.showCreate));
router.post('/sales/scan', requireAuth, requireAdminOrStaff, upload.single('scan_image'), sales.scanInvoice);
router.post('/sales/create', requireAuth, requireAdminOrStaff, upload.single('prescription_image'), sales.create);
router.post('/sales/status/:id', ...m(sales.updateStatus));
router.get('/sales/print/:id', ...m(sales.print));
router.get('/sales/:id', ...m(sales.detail));
router.post('/sales/delete/:id', ...m(sales.delete));

router.get('/batch', ...m(batch.list));
router.get('/batch/create', ...m(batch.showCreate));
router.post('/batch/create', ...m(batch.create));
router.post('/batch/delete/:id', ...m(batch.delete));

router.get('/purchase', ...m(purchase.list));
router.get('/purchase/create', ...m(purchase.showCreate));
router.post('/purchase/create', ...m(purchase.create));
router.get('/purchase/:id', ...m(purchase.detail));
router.post('/purchase/delete/:id', ...m(purchase.delete));

// Shift
router.get('/shift', ...mAdmin(shift.listShift));
router.get('/shift/create', ...mAdmin(shift.showCreateShift));
router.post('/shift/create', ...mAdmin(shift.createShift));
router.get('/shift/edit/:id', ...mAdmin(shift.showEditShift));
router.post('/shift/edit/:id', ...mAdmin(shift.updateShift));
router.post('/shift/delete/:id', ...mAdmin(shift.deleteShift));

// Assignment
router.get('/assignment', ...mAdmin(shift.listAssignment));
router.get('/assignment/create', ...mAdmin(shift.showCreateAssignment));
router.post('/assignment/create', ...mAdmin(shift.createAssignment));
router.get('/assignment/edit/:id', ...mAdmin(shift.showEditAssignment));
router.post('/assignment/edit/:id', ...mAdmin(shift.updateAssignment));
router.post('/assignment/delete/:id', ...mAdmin(shift.deleteAssignment));

module.exports = router;
