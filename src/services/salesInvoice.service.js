const db = require('../config/db');
const { paginate } = require('../utils/pagination.helper');

const BASE_QUERY = `SELECT si.*, s.name_staff, c.name_customer
  FROM sales_invoice si
  LEFT JOIN staff s ON si.id_staff = s.id_staff
  LEFT JOIN customer c ON si.id_customer = c.id_customer`;

async function getAll() {
  const [rows] = await db.execute(`${BASE_QUERY} ORDER BY si.id_sales DESC`);
  return rows;
}

async function getAllPaginated({ page = 1, limit = 15, keyword = '', status = '', dateFrom = '', dateTo = '' } = {}) {
  let where = 'WHERE 1=1';
  const params = [];

  if (keyword) {
    where += ' AND (c.name_customer LIKE ? OR CAST(si.id_sales AS CHAR) LIKE ?)';
    params.push(`%${keyword}%`, `%${keyword}%`);
  }
  if (status) {
    where += ' AND si.status = ?';
    params.push(status);
  }
  if (dateFrom) {
    where += ' AND DATE(si.date_create) >= ?';
    params.push(dateFrom);
  }
  if (dateTo) {
    where += ' AND DATE(si.date_create) <= ?';
    params.push(dateTo);
  }

  const baseQuery = `${BASE_QUERY} ${where} ORDER BY si.id_sales DESC`;
  const countQuery = `SELECT COUNT(*) AS total FROM sales_invoice si LEFT JOIN customer c ON si.id_customer = c.id_customer ${where}`;
  return paginate(baseQuery, countQuery, params, page, limit);
}

async function getById(id) {
  const [rows] = await db.execute(`${BASE_QUERY} WHERE si.id_sales = ? LIMIT 1`, [id]);
  return rows[0] || null;
}
async function getDetails(id) {
  const [rows] = await db.execute(
    `SELECT sd.*, m.name_medicine FROM sales_details sd LEFT JOIN medicine m ON sd.id_medicine = m.id_medicine WHERE sd.id_sales = ?`,
    [id]
  );
  return rows;
}
async function create(data, items) {
  const [result] = await db.execute(
    'INSERT INTO sales_invoice (id_staff, id_customer, status, prescription_image) VALUES (?, ?, ?, ?)',
    [data.id_staff, data.id_customer, data.status || 'da_thanh_toan', data.prescription_image || null]
  );
  const salesId = result.insertId;
  for (const item of (items || [])) {
    await db.execute(
      'INSERT INTO sales_details (id_sales, id_medicine, quantity_sales, price) VALUES (?, ?, ?, ?)',
      [salesId, item.id_medicine, item.quantity_sales, item.price]
    );
    await db.execute(
      'UPDATE medicine SET quantity_total = GREATEST(0, quantity_total - ?) WHERE id_medicine = ?',
      [Number(item.quantity_sales || 0), item.id_medicine]
    );
  }
  return { ok: true, id: salesId };
}
async function updateStatus(id, status) {
  await db.execute('UPDATE sales_invoice SET status = ? WHERE id_sales = ?', [status, id]);
  return { ok: true };
}
async function remove(id) {
  await db.execute('DELETE FROM sales_details WHERE id_sales = ?', [id]);
  await db.execute('DELETE FROM sales_invoice WHERE id_sales = ?', [id]);
  return { ok: true };
}

module.exports = { getAll, getAllPaginated, getById, getDetails, create, updateStatus, remove };
