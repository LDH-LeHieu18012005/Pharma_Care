const svc = require('../../services/salesInvoice.service');
const custSvc = require('../../services/customer.service');
const medSvc = require('../../services/medicine.service');

module.exports = {
  async list(req, res, next) {
    try {
      const { page = 1, keyword = '', status = '', dateFrom = '', dateTo = '' } = req.query;
      const result = await svc.getAllPaginated({ page, limit: 15, keyword, status, dateFrom, dateTo });
      res.render('admin/sales/list', {
        title: 'Hóa đơn bán hàng',
        items: result.rows,
        pagination: result,
        filters: { keyword, status, dateFrom, dateTo },
        query: req.query,
        baseUrl: '/admin/sales'
      });
    } catch (e) { next(e); }
  },
  async detail(req, res, next) {
    try {
      const item = await svc.getById(req.params.id);
      const details = await svc.getDetails(req.params.id);
      res.render('admin/sales/detail', { title: 'Chi tiết HĐ', item, details });
    } catch (e) { next(e); }
  },
  async print(req, res, next) {
    try {
      const item = await svc.getById(req.params.id);
      const details = await svc.getDetails(req.params.id);
      res.render('admin/sales/print', { item, details, layout: false });
    } catch (e) { next(e); }
  },
  async showCreate(req, res, next) {
    try {
      const customers = await custSvc.getAll();
      const medicines = await medSvc.getAll();
      res.render('admin/sales/form', { title: 'Tạo hóa đơn', customers, medicines });
    } catch (e) { next(e); }
  },
  
  async scanInvoice(req, res, next) {
    try {
      if (!req.file) return res.status(400).json({ error: 'Vui lòng chọn ảnh để scan' });
      
      const fs = require('fs');
      const apiKey = process.env.VISION_AGENT_API_KEY;
      if (!apiKey) return res.status(500).json({ error: 'Chưa cấu hình VISION_AGENT_API_KEY' });

      // 1. Gửi ảnh cho Landing AI ADE /parse
      const fileBuffer = await fs.promises.readFile(req.file.path);
      const blob = new Blob([fileBuffer], { type: req.file.mimetype });
      const parseForm = new FormData();
      parseForm.append('document', blob, req.file.originalname);

      const parseRes = await fetch('https://api.va.landing.ai/v1/ade/parse', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}` },
        body: parseForm
      });

      if (!parseRes.ok) {
        const text = await parseRes.text();
        console.error('Landing AI Parse Error:', text);
        return res.status(500).json({ error: 'Lỗi khi phân tích ảnh bằng AI' });
      }

      const parseData = await parseRes.json();
      const markdown = parseData.markdown || parseData.data?.markdown || JSON.stringify(parseData);

      // 2. Gửi markdown qua /extract để lấy JSON có cấu trúc
      const schema = {
        type: "object",
        properties: {
          customer_name: { type: "string" },
          customer_phone: { type: "string" },
          medicines: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                quantity: { type: "integer" }
              }
            }
          }
        }
      };

      const extractForm = new FormData();
      extractForm.append('schema', JSON.stringify(schema));
      extractForm.append('markdown', markdown);

      const extractRes = await fetch('https://api.va.landing.ai/v1/ade/extract', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}` },
        body: extractForm
      });

      if (!extractRes.ok) {
        console.error('Landing AI Extract Error:', await extractRes.text());
        return res.status(500).json({ error: 'Lỗi khi trích xuất dữ liệu từ văn bản AI' });
      }

      const extractData = await extractRes.json();
      let finalData = extractData.extraction || extractData.data?.extraction || extractData;

      // Auto create customer if not exists
      if (finalData.customer_phone) {
        let phone = finalData.customer_phone.replace(/[^0-9]/g, '');
        if (phone) {
          finalData.customer_phone = phone; // Normalize phone
          let customer = await custSvc.findByPhone(phone);
          if (customer) {
            finalData.id_customer = customer.id_customer;
          } else {
            // Create new customer
            const newCust = await custSvc.create({
              name_customer: finalData.customer_name || 'Khách vãng lai (AI Scan)',
              phone_customer: phone,
              gender_customer: 'Khac'
            });
            if (newCust.ok) {
              finalData.id_customer = newCust.id;
              finalData.is_new_customer = true;
            }
          }
        }
      }

      // Xóa file tạm sau khi scan xong
      fs.unlink(req.file.path, () => {});

      return res.json({
        success: true,
        data: finalData
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Lỗi máy chủ khi kết nối AI' });
    }
  },

  async create(req, res, next) {
    try {
      const items = [];
      const ids = [].concat(req.body.id_medicine || []);
      const qtys = [].concat(req.body.quantity_sales || []);
      const prices = [].concat(req.body.price || []);
      for (let i = 0; i < ids.length; i++) {
        if (ids[i]) items.push({ id_medicine: ids[i], quantity_sales: qtys[i] || 1, price: prices[i] || 0 });
      }
      const invoiceData = {
        id_staff: req.session.user.id,
        id_customer: req.body.id_customer,
        prescription_image: req.file ? '/uploads/' + req.file.filename : null
      };
      await svc.create(invoiceData, items);
      res.redirect('/admin/sales');
    } catch (e) { next(e); }
  },
  async updateStatus(req, res, next) {
    try {
      await svc.updateStatus(req.params.id, req.body.status);
      res.redirect('/admin/sales/' + req.params.id);
    } catch (e) { next(e); }
  },
  async delete(req, res, next) {
    try {
      await svc.remove(req.params.id);
      res.redirect('/admin/sales');
    } catch (e) { next(e); }
  }
};
