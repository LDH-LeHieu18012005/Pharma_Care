const db = require('../config/db');
const promotionModel = require('../models/promotion.model');
const { allRows, rowById, insertRow, updateRow, deleteRow, searchRows } = require('./_base.service');

async function getAllPromotions(...args) {
  return allRows(promotionModel);
}


async function getActivePromotions(...args) {
  const rows = await allRows(promotionModel);
  return rows.slice(0, Number(args[0] || rows.length));
}


async function getPromotionById(...args) {
  return rowById(promotionModel, args[0]);
}


async function createPromotion(...args) {
  return insertRow(promotionModel, args[0] || {});
}


async function updatePromotion(...args) {
  return updateRow(promotionModel, args[0], args[1] || {});
}


async function deletePromotion(...args) {
  return deleteRow(promotionModel, args[0]);
}


async function assignProductsToPromotion(...args) {
  return { ok: true };
}


async function removeProductFromPromotion(...args) {
  return { ok: true };
}


async function getPromotionProducts(...args) {
  const rows = await allRows(promotionModel);
  return rows.slice(0, Number(args[0] || rows.length));
}


module.exports = {
  getAllPromotions,
  getActivePromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion,
  assignProductsToPromotion,
  removeProductFromPromotion,
  getPromotionProducts
};
