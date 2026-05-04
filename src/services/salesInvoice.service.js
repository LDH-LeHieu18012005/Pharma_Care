const db = require('../config/db');

async function getAll() {
  const [rows] = await db.execute(`SELECT si.*, s.name_staff, c.name_customer FROM sales_invoice si LEFT JOIN staff s ON si.id_staff = s.id_staff LEFT JOIN customer c ON si.id_customer = c.id_customer ORDER BY si.id_sales DESC`);
  return rows;
}
async function getById(id) {
  const [rows] = await db.execute(`SELECT si.*, s.name_staff, c.name_customer FROM sales_invoice si LEFT JOIN staff s ON si.id_staff = s.id_staff LEFT JOIN customer c ON si.id_customer = c.id_customer WHERE si.id_sales = ? LIMIT 1`, [id]);
  return rows[0] || null;
}
async function getDetails(id) {
  const [rows] = await db.execute(`SELECT sd.*, m.name_medicine FROM sales_details sd LEFT JOIN medicine m ON sd.id_medicine = m.id_medicine WHERE sd.id_sales = ?`, [id]);
  return rows;
}
async function create(data, items) {
  const [result] = await db.execute('INSERT INTO sales_invoice (id_staff, id_customer, status) VALUES (?, ?, ?)',
    [data.id_staff, data.id_customer, 'da_thanh_toan']);
  const salesId = result.insertId;
  for (const item of (items || [])) {
    await db.execute('INSERT INTO sales_details (id_sales, id_medicine, quantity_sales, price) VALUES (?, ?, ?, ?)',
      [salesId, item.id_medicine, item.quantity_sales, item.price]);
    await db.execute('UPDATE medicine SET quantity_total = GREATEST(0, quantity_total - ?) WHERE id_medicine = ?',
      [Number(item.quantity_sales || 0), item.id_medicine]);
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

module.exports = { getAll, getById, getDetails, create, updateStatus, remove };
