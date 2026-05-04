const db = require('../config/db');

async function getAll() {
  const [rows] = await db.execute(`SELECT pi.*, s.name_supplier FROM purchase_invoice pi LEFT JOIN supplier s ON pi.id_supplier = s.id_supplier ORDER BY pi.id_purchase DESC`);
  return rows;
}
async function getById(id) {
  const [rows] = await db.execute(`SELECT pi.*, s.name_supplier FROM purchase_invoice pi LEFT JOIN supplier s ON pi.id_supplier = s.id_supplier WHERE pi.id_purchase = ? LIMIT 1`, [id]);
  return rows[0] || null;
}
async function getDetails(id) {
  const [rows] = await db.execute(`SELECT pd.*, b.*, m.name_medicine FROM purchase_details pd LEFT JOIN batchs b ON pd.id_batch = b.id_batch LEFT JOIN medicine m ON b.id_medicine = m.id_medicine WHERE pd.id_purchase = ?`, [id]);
  return rows;
}
async function create(data, batchIds) {
  const [result] = await db.execute('INSERT INTO purchase_invoice (id_supplier) VALUES (?)', [data.id_supplier]);
  const purchaseId = result.insertId;
  for (const batchId of (batchIds || [])) {
    await db.execute('INSERT INTO purchase_details (id_purchase, id_batch) VALUES (?, ?)', [purchaseId, batchId]);
  }
  return { ok: true, id: purchaseId };
}
async function remove(id) {
  await db.execute('DELETE FROM purchase_details WHERE id_purchase = ?', [id]);
  await db.execute('DELETE FROM purchase_invoice WHERE id_purchase = ?', [id]);
  return { ok: true };
}

module.exports = { getAll, getById, getDetails, create, remove };
