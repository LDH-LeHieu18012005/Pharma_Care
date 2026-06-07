const db = require('../config/db');
const model = require('../models/supplier.model');
const { rowById, insertRow, updateRow, deleteRow } = require('./_base.service');
const { paginate } = require('../utils/pagination.helper');

async function getAll() {
  const [rows] = await db.execute(`SELECT * FROM supplier ORDER BY id_supplier DESC`);
  return rows;
}

async function getAllPaginated({ page = 1, limit = 15, keyword = '' } = {}) {
  let where = 'WHERE 1=1';
  const params = [];

  if (keyword) {
    where += ' AND (name_supplier LIKE ? OR phone_supplier LIKE ? OR gmail_supplier LIKE ?)';
    params.push(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`);
  }

  const baseQuery = `SELECT * FROM supplier ${where} ORDER BY id_supplier DESC`;
  const countQuery = `SELECT COUNT(*) AS total FROM supplier ${where}`;
  return paginate(baseQuery, countQuery, params, page, limit);
}

async function getById(id) { return rowById(model, id); }
async function create(data) { return insertRow(model, data); }
async function update(id, data) { return updateRow(model, id, data); }
async function remove(id) { return deleteRow(model, id); }
async function search(keyword) {
  const [rows] = await db.execute(
    `SELECT * FROM supplier WHERE name_supplier LIKE ? OR phone_supplier LIKE ? ORDER BY id_supplier DESC`,
    [`%${keyword}%`, `%${keyword}%`]
  );
  return rows;
}

module.exports = { getAll, getAllPaginated, getById, create, update, remove, search };
