const db = require('../config/db');
const shiftModel = require('../models/shift.model');
const assignmentModel = require('../models/assignment.model');
const { allRows, rowById, insertRow, updateRow, deleteRow } = require('./_base.service');

async function getAllShifts() { return allRows(shiftModel); }
async function getShiftById(id) { return rowById(shiftModel, id); }
async function createShift(data) { return insertRow(shiftModel, data); }
async function updateShift(id, data) { return updateRow(shiftModel, id, data); }
async function deleteShift(id) { return deleteRow(shiftModel, id); }

async function getAllAssignments() {
  const [rows] = await db.execute(`SELECT a.*, s.name_staff, sh.start_time, sh.description AS shift_desc FROM assignment a LEFT JOIN staff s ON a.id_staff = s.id_staff LEFT JOIN shifts sh ON a.id_shift = sh.id_shift ORDER BY a.dates DESC`);
  return rows;
}
async function createAssignment(data) { return insertRow(assignmentModel, data); }
async function deleteAssignment(id) { return deleteRow(assignmentModel, id); }

module.exports = { getAllShifts, getShiftById, createShift, updateShift, deleteShift, getAllAssignments, createAssignment, deleteAssignment };
