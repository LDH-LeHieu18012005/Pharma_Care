const db = require('../config/db');
const medicineModel = require('../models/medicine.model');
const { allRows, rowById, insertRow, updateRow, deleteRow, searchRows } = require('./_base.service');

async function getAll() {
  const [rows] = await db.execute(`SELECT m.*, mt.name_type, lr.name_rack FROM medicine m LEFT JOIN medicine_type mt ON m.id_type = mt.id_type LEFT JOIN location_rack lr ON m.id_rack = lr.id_rack ORDER BY m.id_medicine DESC`);
  return rows;
}
async function getById(id) { return rowById(medicineModel, id); }
async function create(data) { return insertRow(medicineModel, data); }
async function update(id, data) { return updateRow(medicineModel, id, data); }
async function remove(id) { return deleteRow(medicineModel, id); }
async function search(keyword) { return searchRows(medicineModel, keyword); }

module.exports = { getAll, getById, create, update, remove, search };
