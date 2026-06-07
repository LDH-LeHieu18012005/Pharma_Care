const db = require('../config/db');

async function getSummary() {
  const [[med]] = await db.execute('SELECT COUNT(*) AS total FROM medicine');
  const [[cust]] = await db.execute('SELECT COUNT(*) AS total FROM customer');
  const [[staff]] = await db.execute('SELECT COUNT(*) AS total FROM staff');
  const [[sales]] = await db.execute('SELECT COUNT(*) AS total FROM sales_invoice');
  const [[revenue]] = await db.execute(
    "SELECT IFNULL(SUM(sd.quantity_sales * sd.price), 0) AS total FROM sales_details sd INNER JOIN sales_invoice si ON sd.id_sales = si.id_sales WHERE si.status = 'da_thanh_toan'"
  );
  // Hôm nay
  const [[todaySales]] = await db.execute(
    "SELECT COUNT(*) AS total FROM sales_invoice WHERE DATE(date_create) = CURDATE()"
  );
  const [[todayRevenue]] = await db.execute(
    "SELECT IFNULL(SUM(sd.quantity_sales * sd.price), 0) AS total FROM sales_details sd INNER JOIN sales_invoice si ON sd.id_sales = si.id_sales WHERE DATE(si.date_create) = CURDATE() AND si.status = 'da_thanh_toan'"
  );
  return {
    totalMedicine: med.total,
    totalCustomer: cust.total,
    totalStaff: staff.total,
    totalSales: sales.total,
    totalRevenue: revenue.total,
    todaySales: todaySales.total,
    todayRevenue: todayRevenue.total
  };
}

async function getLowStock(limit = 10) {
  const [rows] = await db.execute(
    'SELECT * FROM medicine ORDER BY quantity_total ASC LIMIT ?', [limit]
  );
  return rows;
}

async function getExpiringBatches() {
  const [rows] = await db.execute(
    "SELECT b.*, m.name_medicine FROM batchs b LEFT JOIN medicine m ON b.id_medicine = m.id_medicine WHERE b.expiry_date <= DATE_ADD(CURDATE(), INTERVAL 30 DAY) AND b.status = 'con_hang' ORDER BY b.expiry_date ASC"
  );
  return rows;
}

// Doanh thu 12 tháng theo năm
async function getRevenueByMonth(year) {
  const y = parseInt(year) || new Date().getFullYear();
  const [rows] = await db.execute(
    `SELECT MONTH(si.date_create) AS month,
            IFNULL(SUM(sd.quantity_sales * sd.price), 0) AS revenue,
            COUNT(DISTINCT si.id_sales) AS orders
     FROM sales_invoice si
     LEFT JOIN sales_details sd ON si.id_sales = sd.id_sales
     WHERE YEAR(si.date_create) = ? AND si.status = 'da_thanh_toan'
     GROUP BY MONTH(si.date_create)
     ORDER BY month ASC`,
    [y]
  );
  // Điền đủ 12 tháng (tháng không có data = 0)
  const result = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    revenue: 0,
    orders: 0
  }));
  rows.forEach(r => {
    result[r.month - 1].revenue = Number(r.revenue);
    result[r.month - 1].orders = Number(r.orders);
  });
  return result;
}

// Top N thuốc bán chạy nhất
async function getTopMedicines(limit = 5) {
  const [rows] = await db.execute(
    `SELECT m.name_medicine,
            SUM(sd.quantity_sales) AS total_qty,
            SUM(sd.quantity_sales * sd.price) AS total_revenue
     FROM sales_details sd
     INNER JOIN medicine m ON sd.id_medicine = m.id_medicine
     INNER JOIN sales_invoice si ON sd.id_sales = si.id_sales
     WHERE si.status = 'da_thanh_toan'
     GROUP BY sd.id_medicine, m.name_medicine
     ORDER BY total_qty DESC
     LIMIT ?`,
    [limit]
  );
  return rows;
}

// Thống kê đơn hàng theo trạng thái
async function getSalesByStatus() {
  const [rows] = await db.execute(
    `SELECT status, COUNT(*) AS total FROM sales_invoice GROUP BY status`
  );
  const result = { cho_xu_ly: 0, da_thanh_toan: 0, da_huy: 0 };
  rows.forEach(r => { result[r.status] = Number(r.total); });
  return result;
}

// Doanh thu 7 ngày gần nhất
async function getRevenueLastDays(days = 7) {
  const [rows] = await db.execute(
    `SELECT DATE(si.date_create) AS day,
            IFNULL(SUM(sd.quantity_sales * sd.price), 0) AS revenue,
            COUNT(DISTINCT si.id_sales) AS orders
     FROM sales_invoice si
     LEFT JOIN sales_details sd ON si.id_sales = sd.id_sales
     WHERE si.date_create >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
       AND si.status = 'da_thanh_toan'
     GROUP BY DATE(si.date_create)
     ORDER BY day ASC`,
    [days]
  );
  return rows;
}

module.exports = {
  getSummary,
  getLowStock,
  getExpiringBatches,
  getRevenueByMonth,
  getTopMedicines,
  getSalesByStatus,
  getRevenueLastDays
};
