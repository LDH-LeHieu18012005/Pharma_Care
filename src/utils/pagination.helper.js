const db = require('../config/db');

/**
 * Phân trang server-side
 * @param {string} baseQuery  - SQL query không có LIMIT/OFFSET
 * @param {string} countQuery - SQL COUNT(*) query tương ứng
 * @param {Array}  params     - Params cho cả 2 query
 * @param {number} page       - Trang hiện tại (bắt đầu từ 1)
 * @param {number} limit      - Số dòng mỗi trang
 * @returns {{ rows, total, totalPages, currentPage, limit }}
 */
async function paginate(baseQuery, countQuery, params = [], page = 1, limit = 15) {
  const currentPage = Math.max(1, parseInt(page) || 1);
  const perPage = Math.max(1, parseInt(limit) || 15);
  const offset = (currentPage - 1) * perPage;

  const [[countResult]] = await db.execute(countQuery, params);
  const total = Number(countResult.total || 0);
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const paginatedQuery = `${baseQuery} LIMIT ${perPage} OFFSET ${offset}`;
  const [rows] = await db.execute(paginatedQuery, params);

  return {
    rows,
    total,
    totalPages,
    currentPage,
    limit: perPage
  };
}

/**
 * Build query string giữ nguyên tất cả params hiện tại, chỉ đổi page
 */
function buildPageUrl(query, page) {
  const q = { ...query, page };
  return '?' + Object.entries(q)
    .filter(([, v]) => v !== '' && v !== undefined && v !== null)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
}

module.exports = { paginate, buildPageUrl };
