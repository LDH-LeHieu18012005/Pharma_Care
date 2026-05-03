const db = require('../config/db');
const cartService = require('./cart.service');

async function prepareCheckout(userId) {
  return cartService.calculateCartSummary(userId);
}

async function validateCheckoutStock(userId) {
  const summary = await cartService.calculateCartSummary(userId);
  return { ok: true, items: summary.items };
}

async function createOrderFromCart(userId, checkoutData) {
  const summary = await cartService.calculateCartSummary(userId);
  if (!summary.items.length) return { ok: false, message: 'Giỏ hàng đang trống' };

  const [result] = await db.execute(
    'INSERT INTO orders (user_id, order_code, receiver_name, receiver_phone, shipping_address, total_amount, payment_method, payment_status, order_status, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      userId,
      'ORD' + Date.now(),
      checkoutData.receiver_name || '',
      checkoutData.receiver_phone || '',
      checkoutData.shipping_address || '',
      summary.totalAmount,
      checkoutData.payment_method || 'COD',
      'unpaid',
      'pending',
      checkoutData.note || ''
    ]
  );

  for (const item of summary.items) {
    await db.execute(
      'INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)',
      [result.insertId, item.product_id, item.quantity, item.unit_price || item.price || 0, Number(item.quantity || 0) * Number(item.unit_price || item.price || 0)]
    );
  }

  const cart = await cartService.getOrCreateCart(userId);
  await db.execute('DELETE FROM cart_items WHERE cart_id = ?', [cart.id]);
  return { ok: true, orderId: result.insertId };
}

async function createDirectOrder(userId, items, checkoutData) {
  return { ok: false, message: 'Chưa hỗ trợ createDirectOrder ở bản sinh tự động' };
}

module.exports = { prepareCheckout, validateCheckoutStock, createOrderFromCart, createDirectOrder };
