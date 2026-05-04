const model = require('../models/supplier.model');
const { allRows, rowById, insertRow, updateRow, deleteRow, searchRows } = require('./_base.service');

async function getAll() { return allRows(model); }
async function getById(id) { return rowById(model, id); }
async function create(data) { return insertRow(model, data); }
async function update(id, data) { return updateRow(model, id, data); }
async function remove(id) { return deleteRow(model, id); }
async function search(keyword) { return searchRows(model, keyword); }

module.exports = { getAll, getById, create, update, remove, search };
