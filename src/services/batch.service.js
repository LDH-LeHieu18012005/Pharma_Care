const db = require('../config/db');
const { paginate } = require('../utils/pagination.helper');

const BASE_QUERY = `SELECT b.*, m.name_medicine
  FROM batchs b
  LEFT JOIN medicine m ON b.id_medicine = m.id_medicine`;

async function getAll() {
  const [rows] = await db.execute(`${BASE_QUERY} ORDER BY b.id_batch DESC`);
  return rows;
}

async function getAllPaginated({ page = 1, limit = 15, keyword = '', status = '' } = {}) {
  let where = 'WHERE 1=1';
  const params = [];

  if (keyword) {
    where += ' AND m.name_medicine LIKE ?';
    params.push(`%${keyword}%`);
  }
  if (status) {
    where += ' AND b.status = ?';
    params.push(status);
  }

  const baseQuery = `${BASE_QUERY} ${where} ORDER BY b.id_batch DESC`;
  const countQuery = `SELECT COUNT(*) AS total FROM batchs b LEFT JOIN medicine m ON b.id_medicine = m.id_medicine ${where}`;
  return paginate(baseQuery, countQuery, params, page, limit);
}

async function getById(id) {
  const [rows] = await db.execute(`${BASE_QUERY} WHERE b.id_batch = ? LIMIT 1`, [id]);
  return rows[0] || null;
}
async function create(data) {
  const [result] = await db.execute(
    'INSERT INTO batchs (id_medicine, quantity_in_batch, entry_price, manufacturing_date, expiry_date, status) VALUES (?, ?, ?, ?, ?, ?)',
    [data.id_medicine, data.quantity_in_batch || 0, data.entry_price || 0, data.manufacturing_date || null, data.expiry_date || null, data.status || 'con_hang']
  );
  if (result.insertId) {
    await db.execute(
      'UPDATE medicine SET quantity_total = quantity_total + ? WHERE id_medicine = ?',
      [Number(data.quantity_in_batch || 0), data.id_medicine]
    );
  }
  return { ok: true, id: result.insertId };
}
async function update(id, data) {
  const model = require('../models/batch.model');
  const { updateRow } = require('./_base.service');
  return updateRow(model, id, data);
}
async function remove(id) {
  const model = require('../models/batch.model');
  const { deleteRow } = require('./_base.service');
  return deleteRow(model, id);
}

module.exports = { getAll, getAllPaginated, getById, create, update, remove };
