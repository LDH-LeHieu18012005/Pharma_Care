const db = require('../config/db');
const staffModel = require('../models/staff.model');
const { allRows, rowById, insertRow, updateRow, deleteRow, searchRows } = require('./_base.service');
const { hashPassword } = require('../utils/hash');

async function getAll() { return allRows(staffModel); }
async function getById(id) { return rowById(staffModel, id); }
async function create(data) {
  if (data.password) data.password = await hashPassword(data.password);
  return insertRow(staffModel, data);
}
async function update(id, data) {
  if (data.password && data.password.trim()) {
    data.password = await hashPassword(data.password);
  } else {
    delete data.password;
  }
  return updateRow(staffModel, id, data);
}
async function remove(id) { return deleteRow(staffModel, id); }
async function search(keyword) { return searchRows(staffModel, keyword); }

module.exports = { getAll, getById, create, update, remove, search };
