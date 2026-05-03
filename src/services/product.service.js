const db = require('../config/db');
const productModel = require('../models/product.model');
const { allRows, rowById, insertRow, updateRow, deleteRow, searchRows } = require('./_base.service');

async function getFeaturedProducts(...args) {
  const rows = await allRows(productModel);
  return rows.slice(0, Number(args[0] || rows.length));
}


async function getNewestProducts(...args) {
  const rows = await allRows(productModel);
  return rows.slice(0, Number(args[0] || rows.length));
}


async function getPromotionProducts(...args) {
  const rows = await allRows(productModel);
  return rows.slice(0, Number(args[0] || rows.length));
}


async function getAllProducts(...args) {
  return allRows(productModel);
}


async function getProductById(...args) {
  return rowById(productModel, args[0]);
}


async function getProductDetail(...args) {
  const product = await rowById(productModel, args[0]);
  const [images] = await db.execute('SELECT * FROM product_images WHERE product_id = ? ORDER BY id DESC', [args[0]]);
  const [relatedProducts] = await db.execute('SELECT * FROM products WHERE id <> ? ORDER BY id DESC LIMIT 4', [args[0]]);
  return { product, images, relatedProducts };
}


async function searchProducts(...args) {
  return searchRows(productModel, args[0]);
}


async function filterProducts(...args) {
  const filters = args[0] || {};
  let sql = 'SELECT * FROM products WHERE 1=1';
  const params = [];
  if (filters.category_id) { sql += ' AND category_id = ?'; params.push(filters.category_id); }
  if (filters.brand_id) { sql += ' AND brand_id = ?'; params.push(filters.brand_id); }
  sql += ' ORDER BY id DESC';
  const [rows] = await db.execute(sql, params);
  return rows;
}


async function createProduct(...args) {
  return insertRow(productModel, args[0] || {});
}


async function updateProduct(...args) {
  return updateRow(productModel, args[0], args[1] || {});
}


async function deleteProduct(...args) {
  return deleteRow(productModel, args[0]);
}


async function toggleProductStatus(...args) {
  const item = await rowById(productModel, args[0]);
  if (!item) return { ok: false, message: 'Không tìm thấy sản phẩm' };
  const nextValue = Number(item.is_active || 0) === 1 ? 0 : 1;
  await db.execute('UPDATE products SET is_active = ? WHERE id = ?', [nextValue, args[0]]);
  return { ok: true };
}


async function updateStock(...args) {
  await db.execute('UPDATE products SET stock = ? WHERE id = ?', [args[1], args[0]]);
  return { ok: true };
}


async function getRelatedProducts(...args) {
  const [rows] = await db.execute('SELECT * FROM products WHERE id <> ? ORDER BY id DESC LIMIT ?', [args[0], Number(args[1] || 4)]);
  return rows;
}


module.exports = {
  getFeaturedProducts,
  getNewestProducts,
  getPromotionProducts,
  getAllProducts,
  getProductById,
  getProductDetail,
  searchProducts,
  filterProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  updateStock,
  getRelatedProducts
};
