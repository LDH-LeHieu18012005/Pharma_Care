const db = require('../config/db');
const customerModel = require('../models/customer.model');
const { rowById, insertRow, updateRow, deleteRow } = require('./_base.service');
const { paginate } = require('../utils/pagination.helper');

async function getAll() {
  const [rows] = await db.execute(`SELECT * FROM customer ORDER BY id_customer DESC`);
  return rows;
}

async function getAllPaginated({ page = 1, limit = 15, keyword = '' } = {}) {
  let where = 'WHERE 1=1';
  const params = [];

  if (keyword) {
    where += ' AND (name_customer LIKE ? OR phone_customer LIKE ?)';
    params.push(`%${keyword}%`, `%${keyword}%`);
  }

  const baseQuery = `SELECT * FROM customer ${where} ORDER BY id_customer DESC`;
  const countQuery = `SELECT COUNT(*) AS total FROM customer ${where}`;
  return paginate(baseQuery, countQuery, params, page, limit);
}

async function getById(id) { return rowById(customerModel, id); }
async function create(data) { return insertRow(customerModel, data); }
async function update(id, data) { return updateRow(customerModel, id, data); }
async function remove(id) { return deleteRow(customerModel, id); }
async function search(keyword) {
  const [rows] = await db.execute(
    `SELECT * FROM customer WHERE name_customer LIKE ? OR phone_customer LIKE ? ORDER BY id_customer DESC`,
    [`%${keyword}%`, `%${keyword}%`]
  );
  return rows;
}

async function findByPhone(phone) {
  const [rows] = await db.execute(`SELECT * FROM customer WHERE phone_customer = ? LIMIT 1`, [phone]);
  return rows[0] || null;
}

module.exports = { getAll, getAllPaginated, getById, create, update, remove, search, findByPhone };
