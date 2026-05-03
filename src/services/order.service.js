const db = require('../config/db');
const orderModel = require('../models/order.model');
const { allRows, rowById, insertRow, updateRow, deleteRow, searchRows } = require('./_base.service');

async function getOrdersByUser(...args) {
  const [rows] = await db.execute('SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC', [args[0]]);
  return rows;
}


async function getOrderDetailByUser(...args) {
  const [rows] = await db.execute('SELECT * FROM orders WHERE id = ? AND user_id = ? LIMIT 1', [args[1], args[0]]);
  return rows[0] || null;
}


async function getAllOrders(...args) {
  const [rows] = await db.execute('SELECT * FROM orders ORDER BY id DESC');
  return rows;
}


async function getOrderById(...args) {
  return rowById(orderModel, args[0]);
}


async function getOrderDetail(...args) {
  return rowById(orderModel, args[0]);
}


async function updateOrderStatus(...args) {
  await db.execute('UPDATE orders SET order_status = ? WHERE id = ?', [args[1], args[0]]);
  return { ok: true };
}


async function updatePaymentStatus(...args) {
  await db.execute('UPDATE orders SET payment_status = ? WHERE id = ?', [args[1], args[0]]);
  return { ok: true };
}


async function cancelOrderByCustomer(...args) {
  const status = 'cancelled';
  await db.execute('UPDATE orders SET order_status = ? WHERE id = ?', [status, args[0]]);
  return { ok: true };
}


async function confirmOrder(...args) {
  const status = 'confirmed';
  await db.execute('UPDATE orders SET order_status = ? WHERE id = ?', [status, args[0]]);
  return { ok: true };
}


async function shipOrder(...args) {
  const status = 'shipping';
  await db.execute('UPDATE orders SET order_status = ? WHERE id = ?', [status, args[0]]);
  return { ok: true };
}


async function deliverOrder(...args) {
  const status = 'delivered';
  await db.execute('UPDATE orders SET order_status = ? WHERE id = ?', [status, args[0]]);
  return { ok: true };
}


async function cancelOrderByAdmin(...args) {
  const status = 'cancelled';
  await db.execute('UPDATE orders SET order_status = ? WHERE id = ?', [status, args[0]]);
  return { ok: true };
}


async function countOrders(...args) {
  const [rows] = await db.execute('SELECT COUNT(*) AS total FROM orders');
  return rows[0]?.total || 0;
}


module.exports = {
  getOrdersByUser,
  getOrderDetailByUser,
  getAllOrders,
  getOrderById,
  getOrderDetail,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrderByCustomer,
  confirmOrder,
  shipOrder,
  deliverOrder,
  cancelOrderByAdmin,
  countOrders
};
