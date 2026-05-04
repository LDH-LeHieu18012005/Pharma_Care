const model = require('../models/locationRack.model');
const { allRows, rowById, insertRow, updateRow, deleteRow } = require('./_base.service');

async function getAll() { return allRows(model); }
async function getById(id) { return rowById(model, id); }
async function create(data) { return insertRow(model, data); }
async function update(id, data) { return updateRow(model, id, data); }
async function remove(id) { return deleteRow(model, id); }

module.exports = { getAll, getById, create, update, remove };
