const db = require('../config/db');

async function getSummary() {
  const [[med]] = await db.execute('SELECT COUNT(*) AS total FROM medicine');
  const [[cust]] = await db.execute('SELECT COUNT(*) AS total FROM customer');
  const [[staff]] = await db.execute('SELECT COUNT(*) AS total FROM staff');
  const [[sales]] = await db.execute('SELECT COUNT(*) AS total FROM sales_invoice');
  const [[revenue]] = await db.execute("SELECT IFNULL(SUM(sd.quantity_sales * sd.price), 0) AS total FROM sales_details sd INNER JOIN sales_invoice si ON sd.id_sales = si.id_sales WHERE si.status = 'da_thanh_toan'");
  return { totalMedicine: med.total, totalCustomer: cust.total, totalStaff: staff.total, totalSales: sales.total, totalRevenue: revenue.total };
}

async function getLowStock(limit = 10) {
  const [rows] = await db.execute('SELECT * FROM medicine ORDER BY quantity_total ASC LIMIT ?', [limit]);
  return rows;
}

async function getExpiringBatches() {
  const [rows] = await db.execute("SELECT b.*, m.name_medicine FROM batchs b LEFT JOIN medicine m ON b.id_medicine = m.id_medicine WHERE b.expiry_date <= DATE_ADD(CURDATE(), INTERVAL 30 DAY) AND b.status = 'con_hang' ORDER BY b.expiry_date ASC");
  return rows;
}

module.exports = { getSummary, getLowStock, getExpiringBatches };
