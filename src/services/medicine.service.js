const db = require('../config/db');
const medicineModel = require('../models/medicine.model');
const { rowById, insertRow, updateRow, deleteRow } = require('./_base.service');
const { paginate } = require('../utils/pagination.helper');

const BASE_QUERY = `SELECT m.*, mt.name_type, lr.name_rack
  FROM medicine m
  LEFT JOIN medicine_type mt ON m.id_type = mt.id_type
  LEFT JOIN location_rack lr ON m.id_rack = lr.id_rack`;

async function getAll() {
  const [rows] = await db.execute(`${BASE_QUERY} ORDER BY m.id_medicine DESC`);
  return rows;
}

async function getAllPaginated({ page = 1, limit = 15, keyword = '', typeId = '', status = '' } = {}) {
  let where = 'WHERE 1=1';
  const params = [];

  if (keyword) {
    where += ' AND (m.name_medicine LIKE ? OR mt.name_type LIKE ?)';
    params.push(`%${keyword}%`, `%${keyword}%`);
  }
  if (typeId) {
    where += ' AND m.id_type = ?';
    params.push(typeId);
  }
  if (status) {
    where += ' AND m.medicine_status = ?';
    params.push(status);
  }

  const baseQuery = `${BASE_QUERY} ${where} ORDER BY m.id_medicine DESC`;
  const countQuery = `SELECT COUNT(*) AS total FROM medicine m LEFT JOIN medicine_type mt ON m.id_type = mt.id_type ${where}`;
  return paginate(baseQuery, countQuery, params, page, limit);
}

async function getById(id) { return rowById(medicineModel, id); }
async function create(data) { return insertRow(medicineModel, data); }
async function update(id, data) { return updateRow(medicineModel, id, data); }
async function remove(id) { return deleteRow(medicineModel, id); }

async function searchAdvanced(keyword, typeId, maxPrice) {
  let query = `${BASE_QUERY} WHERE 1=1`;
  const params = [];

  if (keyword) {
    query += ' AND (m.name_medicine LIKE ? OR mt.name_type LIKE ?)';
    params.push(`%${keyword}%`, `%${keyword}%`);
  }
  if (typeId) {
    query += ' AND m.id_type = ?';
    params.push(typeId);
  }
  if (maxPrice) {
    query += ' AND m.price <= ?';
    params.push(maxPrice);
  }
  query += ' ORDER BY m.id_medicine DESC';
  const [rows] = await db.execute(query, params);
  return rows;
}

module.exports = { getAll, getAllPaginated, getById, create, update, remove, searchAdvanced };
