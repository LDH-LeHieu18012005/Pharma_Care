const XLSX = require('xlsx');
const PDFDocument = require('pdfkit');
const db = require('../../config/db');

// ── Helper: Gửi file Excel ra response ──────────────────────────────
function sendExcel(res, filename, sheetName, data) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  // Tự động điều chỉnh độ rộng cột
  const colWidths = Object.keys(data[0] || {}).map(key => ({
    wch: Math.max(key.length, ...data.map(row => String(row[key] || '').length)) + 2
  }));
  ws['!cols'] = colWidths;
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buf);
}

// ── 1. Xuất danh sách thuốc ─────────────────────────────────────────
exports.exportMedicineExcel = async (req, res, next) => {
  try {
    const [rows] = await db.execute(`
      SELECT m.id_medicine AS 'Mã thuốc',
             m.name_medicine AS 'Tên thuốc',
             mt.name_type AS 'Loại thuốc',
             lr.name_rack AS 'Kệ thuốc',
             m.price AS 'Giá bán (đ)',
             m.quantity_total AS 'Tồn kho',
             CASE m.medicine_status
               WHEN 'con_hang' THEN 'Còn hàng'
               WHEN 'het_hang' THEN 'Hết hàng'
               WHEN 'ngung_kinh_doanh' THEN 'Ngừng kinh doanh'
             END AS 'Trạng thái',
             DATE_FORMAT(m.expiry_date, '%d/%m/%Y') AS 'Hạn dùng',
             m.descriptions AS 'Mô tả'
      FROM medicine m
      LEFT JOIN medicine_type mt ON m.id_type = mt.id_type
      LEFT JOIN location_rack lr ON m.id_rack = lr.id_rack
      ORDER BY m.id_medicine DESC
    `);
    sendExcel(res, `danh-sach-thuoc-${Date.now()}.xlsx`, 'Danh sách thuốc', rows);
  } catch (e) { next(e); }
};

// ── 2. Xuất hóa đơn bán hàng Excel ─────────────────────────────────
exports.exportSalesExcel = async (req, res, next) => {
  try {
    const [rows] = await db.execute(`
      SELECT si.id_sales AS 'Mã HĐ',
             DATE_FORMAT(si.date_create, '%d/%m/%Y %H:%i') AS 'Ngày tạo',
             c.name_customer AS 'Khách hàng',
             c.phone_customer AS 'SĐT khách',
             s.name_staff AS 'Nhân viên',
             CASE si.status
               WHEN 'cho_xu_ly' THEN 'Chờ xử lý'
               WHEN 'da_thanh_toan' THEN 'Đã thanh toán'
               WHEN 'da_huy' THEN 'Đã hủy'
             END AS 'Trạng thái',
             IFNULL(SUM(sd.quantity_sales * sd.price), 0) AS 'Tổng tiền (đ)'
      FROM sales_invoice si
      LEFT JOIN customer c ON si.id_customer = c.id_customer
      LEFT JOIN staff s ON si.id_staff = s.id_staff
      LEFT JOIN sales_details sd ON si.id_sales = sd.id_sales
      GROUP BY si.id_sales
      ORDER BY si.id_sales DESC
    `);
    sendExcel(res, `hoa-don-ban-${Date.now()}.xlsx`, 'Hóa đơn bán', rows);
  } catch (e) { next(e); }
};

// ── 3. Xuất hóa đơn nhập hàng Excel ────────────────────────────────
exports.exportPurchaseExcel = async (req, res, next) => {
  try {
    const [rows] = await db.execute(`
      SELECT pi.id_purchase AS 'Mã phiếu nhập',
             DATE_FORMAT(pi.date_create, '%d/%m/%Y %H:%i') AS 'Ngày tạo',
             s.name_supplier AS 'Nhà cung cấp',
             s.phone_supplier AS 'SĐT NCC',
             COUNT(pd.id_batch) AS 'Số lô hàng'
      FROM purchase_invoice pi
      LEFT JOIN supplier s ON pi.id_supplier = s.id_supplier
      LEFT JOIN purchase_details pd ON pi.id_purchase = pd.id_purchase
      GROUP BY pi.id_purchase
      ORDER BY pi.id_purchase DESC
    `);
    sendExcel(res, `hoa-don-nhap-${Date.now()}.xlsx`, 'Hóa đơn nhập', rows);
  } catch (e) { next(e); }
};

// ── 4. Xuất khách hàng Excel ────────────────────────────────────────
exports.exportCustomerExcel = async (req, res, next) => {
  try {
    const [rows] = await db.execute(`
      SELECT id_customer AS 'Mã KH',
             name_customer AS 'Tên khách hàng',
             age_customer AS 'Tuổi',
             gender_customer AS 'Giới tính',
             phone_customer AS 'Số điện thoại',
             address_customer AS 'Địa chỉ',
             DATE_FORMAT(time_create, '%d/%m/%Y') AS 'Ngày tạo'
      FROM customer ORDER BY id_customer DESC
    `);
    sendExcel(res, `danh-sach-khach-hang-${Date.now()}.xlsx`, 'Khách hàng', rows);
  } catch (e) { next(e); }
};

// ── 5. Xuất nhà cung cấp Excel ──────────────────────────────────────
exports.exportSupplierExcel = async (req, res, next) => {
  try {
    const [rows] = await db.execute(`
      SELECT id_supplier AS 'Mã NCC',
             name_supplier AS 'Tên nhà cung cấp',
             phone_supplier AS 'SĐT',
             gmail_supplier AS 'Email',
             address_supplier AS 'Địa chỉ',
             CASE status WHEN 1 THEN 'Hoạt động' ELSE 'Ngừng' END AS 'Trạng thái'
      FROM supplier ORDER BY id_supplier DESC
    `);
    sendExcel(res, `nha-cung-cap-${Date.now()}.xlsx`, 'Nhà cung cấp', rows);
  } catch (e) { next(e); }
};

// ── 6. Xuất lô hàng Excel ───────────────────────────────────────────
exports.exportBatchExcel = async (req, res, next) => {
  try {
    const [rows] = await db.execute(`
      SELECT b.id_batch AS 'Mã lô',
             m.name_medicine AS 'Tên thuốc',
             b.quantity_in_batch AS 'Số lượng',
             b.entry_price AS 'Giá nhập (đ)',
             DATE_FORMAT(b.manufacturing_date, '%d/%m/%Y') AS 'Ngày SX',
             DATE_FORMAT(b.expiry_date, '%d/%m/%Y') AS 'Hạn dùng',
             CASE b.status
               WHEN 'con_hang' THEN 'Còn hàng'
               WHEN 'het_hang' THEN 'Hết hàng'
               WHEN 'het_han' THEN 'Hết hạn'
             END AS 'Trạng thái'
      FROM batchs b
      LEFT JOIN medicine m ON b.id_medicine = m.id_medicine
      ORDER BY b.id_batch DESC
    `);
    sendExcel(res, `lo-hang-${Date.now()}.xlsx`, 'Lô hàng', rows);
  } catch (e) { next(e); }
};

// ── 7. Xuất báo cáo doanh thu tổng hợp Excel ───────────────────────
exports.exportReportExcel = async (req, res, next) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();

    const [monthly] = await db.execute(`
      SELECT MONTH(si.date_create) AS 'Tháng',
             COUNT(DISTINCT si.id_sales) AS 'Số đơn',
             IFNULL(SUM(sd.quantity_sales * sd.price), 0) AS 'Doanh thu (đ)'
      FROM sales_invoice si
      LEFT JOIN sales_details sd ON si.id_sales = sd.id_sales
      WHERE YEAR(si.date_create) = ? AND si.status = 'da_thanh_toan'
      GROUP BY MONTH(si.date_create)
      ORDER BY 1 ASC
    `, [year]);

    const [topMeds] = await db.execute(`
      SELECT m.name_medicine AS 'Tên thuốc',
             SUM(sd.quantity_sales) AS 'Số lượng bán',
             SUM(sd.quantity_sales * sd.price) AS 'Doanh thu (đ)'
      FROM sales_details sd
      INNER JOIN medicine m ON sd.id_medicine = m.id_medicine
      INNER JOIN sales_invoice si ON sd.id_sales = si.id_sales
      WHERE si.status = 'da_thanh_toan'
      GROUP BY sd.id_medicine ORDER BY 2 DESC LIMIT 20
    `);

    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.json_to_sheet(monthly);
    XLSX.utils.book_append_sheet(wb, ws1, `Doanh thu ${year}`);
    const ws2 = XLSX.utils.json_to_sheet(topMeds);
    XLSX.utils.book_append_sheet(wb, ws2, 'Thuốc bán chạy');

    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Disposition', `attachment; filename="bao-cao-doanh-thu-${year}.xlsx"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buf);
  } catch (e) { next(e); }
};

// ── 8. Xuất hóa đơn bán PDF ─────────────────────────────────────────
exports.exportSalesPDF = async (req, res, next) => {
  try {
    const [invoices] = await db.execute(`
      SELECT si.id_sales, si.date_create, si.status,
             c.name_customer, c.phone_customer,
             s.name_staff,
             IFNULL(SUM(sd.quantity_sales * sd.price), 0) AS total
      FROM sales_invoice si
      LEFT JOIN customer c ON si.id_customer = c.id_customer
      LEFT JOIN staff s ON si.id_staff = s.id_staff
      LEFT JOIN sales_details sd ON si.id_sales = sd.id_sales
      GROUP BY si.id_sales
      ORDER BY si.id_sales DESC
      LIMIT 100
    `);

    const doc = new PDFDocument({ margin: 40, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="hoa-don-ban-${Date.now()}.pdf"`);
    doc.pipe(res);

    // Header
    doc.fontSize(18).text('PHARMA CARE', { align: 'center' });
    doc.fontSize(13).text('BÁO CÁO HÓA ĐƠN BÁN HÀNG', { align: 'center' });
    doc.fontSize(10).text(`Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`, { align: 'center' });
    doc.moveDown(1);

    // Table header
    const cols = [50, 90, 140, 80, 110, 100];
    const headers = ['Mã HĐ', 'Ngày tạo', 'Khách hàng', 'Nhân viên', 'Trạng thái', 'Tổng tiền'];
    let y = doc.y;
    doc.rect(40, y, 515, 18).fill('#2563eb');
    doc.fillColor('white').fontSize(9);
    let x = 40;
    headers.forEach((h, i) => {
      doc.text(h, x + 2, y + 4, { width: cols[i] - 4, align: 'left' });
      x += cols[i];
    });
    doc.fillColor('black');
    y += 20;

    // Rows
    invoices.forEach((inv, idx) => {
      if (y > 740) { doc.addPage(); y = 40; }
      if (idx % 2 === 0) doc.rect(40, y, 515, 16).fill('#f1f5f9');
      doc.fillColor('black').fontSize(8);
      x = 40;
      const statusMap = { da_thanh_toan: 'Đã TT', cho_xu_ly: 'Chờ XL', da_huy: 'Đã hủy' };
      const cells = [
        `HD-${inv.id_sales}`,
        new Date(inv.date_create).toLocaleDateString('vi-VN'),
        inv.name_customer || 'Khách lẻ',
        inv.name_staff || '',
        statusMap[inv.status] || inv.status,
        Number(inv.total).toLocaleString('vi-VN') + 'đ'
      ];
      cells.forEach((cell, i) => {
        doc.text(String(cell), x + 2, y + 3, { width: cols[i] - 4, lineBreak: false });
        x += cols[i];
      });
      y += 18;
    });

    doc.end();
  } catch (e) { next(e); }
};
