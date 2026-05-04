const customerModel = require('../models/customer.model');
const { allRows, rowById, insertRow, updateRow, deleteRow, searchRows } = require('./_base.service');

async function getAll() { return allRows(customerModel); }
async function getById(id) { return rowById(customerModel, id); }
async function create(data) { return insertRow(customerModel, data); }
async function update(id, data) { return updateRow(customerModel, id, data); }
async function remove(id) { return deleteRow(customerModel, id); }
async function search(keyword) { return searchRows(customerModel, keyword); }

module.exports = { getAll, getById, create, update, remove, search };
