const db = require('../config/db');

async function getOrCreateCart(userId) {
  const [rows] = await db.execute('SELECT * FROM carts WHERE user_id = ? LIMIT 1', [userId]);
  if (rows[0]) return rows[0];
  const [result] = await db.execute('INSERT INTO carts (user_id) VALUES (?)', [userId]);
  return { id: result.insertId, user_id: userId };
}

async function getCartByUser(userId) {
  return getOrCreateCart(userId);
}

async function getCartItems(userId) {
  const cart = await getOrCreateCart(userId);
  const [rows] = await db.execute(
    `SELECT ci.*, p.name, p.price, p.thumbnail
     FROM cart_items ci
     LEFT JOIN products p ON p.id = ci.product_id
     WHERE ci.cart_id = ?
     ORDER BY ci.id DESC`,
    [cart.id]
  );
  return rows;
}

async function addToCart(userId, productId, quantity) {
  const cart = await getOrCreateCart(userId);
  const [existing] = await db.execute('SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ? LIMIT 1', [cart.id, productId]);
  const [products] = await db.execute('SELECT * FROM products WHERE id = ? LIMIT 1', [productId]);
  const product = products[0];
  if (!product) return { ok: false, message: 'Không tìm thấy sản phẩm' };
  if (existing[0]) {
    await db.execute('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?', [Number(quantity || 1), existing[0].id]);
  } else {
    await db.execute('INSERT INTO cart_items (cart_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)', [cart.id, productId, Number(quantity || 1), product.price || 0]);
  }
  return { ok: true };
}

async function updateCartItem(userId, cartItemId, quantity) {
  const items = await getCartItems(userId);
  const item = items.find(x => Number(x.id) === Number(cartItemId));
  if (!item) return { ok: false };
  await db.execute('UPDATE cart_items SET quantity = ? WHERE id = ?', [Number(quantity || 1), cartItemId]);
  return { ok: true };
}

async function removeCartItem(userId, cartItemId) {
  const items = await getCartItems(userId);
  const item = items.find(x => Number(x.id) === Number(cartItemId));
  if (!item) return { ok: false };
  await db.execute('DELETE FROM cart_items WHERE id = ?', [cartItemId]);
  return { ok: true };
}

async function clearCart(userId) {
  const cart = await getOrCreateCart(userId);
  await db.execute('DELETE FROM cart_items WHERE cart_id = ?', [cart.id]);
  return { ok: true };
}

async function countCartItems(userId) {
  const cart = await getOrCreateCart(userId);
  const [rows] = await db.execute('SELECT COUNT(*) AS total FROM cart_items WHERE cart_id = ?', [cart.id]);
  return rows[0]?.total || 0;
}

async function calculateCartSummary(userId) {
  const items = await getCartItems(userId);
  const totalQuantity = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const totalAmount = items.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.unit_price || item.price || 0), 0);
  return { items, totalQuantity, totalAmount };
}

module.exports = { getOrCreateCart, getCartByUser, getCartItems, addToCart, updateCartItem, removeCartItem, clearCart, countCartItems, calculateCartSummary };
