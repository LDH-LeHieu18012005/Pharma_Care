const db = require('../config/db');
const assignmentModel = require('../models/assignment.model');
const { allRows, rowById, insertRow, updateRow, deleteRow } = require('./_base.service');

async function getAll() { return allRows(assignmentModel); }
async function getById(id) { return rowById(assignmentModel, id); }
async function create(data) { return insertRow(assignmentModel, data); }
async function update(id, data) { return updateRow(assignmentModel, id, data); }
async function remove(id) { return deleteRow(assignmentModel, id); }

async function getAllWithDetails() {
  const [rows] = await db.execute(`
    SELECT a.*, s.start_time, s.description, st.name_staff 
    FROM assignment a
    JOIN shifts s ON a.id_shift = s.id_shift
    JOIN staff st ON a.id_staff = st.id_staff
    ORDER BY a.dates DESC, s.start_time ASC
  `);
  return rows;
}

module.exports = { getAll, getById, create, update, remove, getAllWithDetails };
