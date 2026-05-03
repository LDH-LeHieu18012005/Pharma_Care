const db = require('../config/db');
const userModel = require('../models/user.model');
const { allRows, rowById, insertRow, updateRow, deleteRow, searchRows } = require('./_base.service');

async function getAllUsers(...args) {
  return allRows(userModel);
}


async function getUserById(...args) {
  return rowById(userModel, args[0]);
}


async function createStaff(...args) {
  return insertRow(userModel, args[0] || {});
}


async function createAdmin(...args) {
  return insertRow(userModel, args[0] || {});
}


async function updateUser(...args) {
  return updateRow(userModel, args[0], args[1] || {});
}


async function updateProfile(...args) {
  return updateRow(userModel, args[0], args[1] || {});
}


async function toggleUserStatus(...args) {
  const item = await rowById(userModel, args[0]);
  if (!item) return { ok: false };
  const nextValue = Number(item.status || 0) === 1 ? 0 : 1;
  await db.execute('UPDATE users SET status = ? WHERE id = ?', [nextValue, args[0]]);
  return { ok: true };
}


async function changeUserRole(...args) {
  await db.execute('UPDATE users SET role_id = ? WHERE id = ?', [args[1], args[0]]);
  return { ok: true };
}


async function deleteUserSoft(...args) {
  return deleteRow(userModel, args[0]);
}


module.exports = {
  getAllUsers,
  getUserById,
  createStaff,
  createAdmin,
  updateUser,
  updateProfile,
  toggleUserStatus,
  changeUserRole,
  deleteUserSoft
};
