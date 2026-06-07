const medicineService = require('../../services/medicine.service');
const customerService = require('../../services/customer.service');
const salesInvoiceService = require('../../services/salesInvoice.service');

exports.viewCart = (req, res) => {
  const cart = req.session?.cart || [];
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  res.render('client/cart', {
    layout: 'layouts/client',
    title: 'Giỏ hàng',
    cart,
    total,
    currentUser: req.session?.user || null
  });
};

exports.addToCart = async (req, res) => {
  try {
    const { medicineId, quantity } = req.body;
    const medicine = await medicineService.getById(medicineId);
    
    if (!medicine) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
    }

    if (!req.session.cart) req.session.cart = [];
    
    const cart = req.session.cart;
    const existingItem = cart.find(item => item.id_medicine == medicineId);

    const qty = parseInt(quantity) || 1;

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.push({
        id_medicine: medicine.id_medicine,
        name_medicine: medicine.name_medicine,
        price: medicine.price,
        images: medicine.images,
        quantity: qty
      });
    }
    
    // Explicitly set the session cart just in case
    req.session.cart = cart;
    
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
      }
      res.redirect('/cart');
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi máy chủ');
  }
};

exports.removeFromCart = (req, res) => {
  const { id } = req.params;
  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => item.id_medicine != id);
    req.session.save((err) => {
      if (err) console.error('Session save error:', err);
      res.redirect('/cart');
    });
  } else {
    res.redirect('/cart');
  }
};

exports.updateCart = (req, res) => {
  const { medicineId, quantity } = req.body;
  if (req.session.cart) {
    const item = req.session.cart.find(i => i.id_medicine == medicineId);
    if (item) {
      item.quantity = parseInt(quantity) > 0 ? parseInt(quantity) : 1;
    }
    req.session.save((err) => {
      if (err) console.error('Session save error:', err);
      res.json({ success: true });
    });
  } else {
    res.json({ success: false, message: 'Giỏ hàng trống' });
  }
};

exports.checkout = (req, res) => {
  const cart = req.session?.cart || [];
  if (cart.length === 0) {
    return res.redirect('/cart');
  }

  let total = 0;
  cart.forEach(item => total += item.price * item.quantity);

  res.render('client/checkout', {
    layout: 'layouts/client',
    title: 'Thanh toán',
    cart,
    total,
    currentUser: req.session?.user || null
  });
};

exports.processCheckout = async (req, res) => {
  try {
    const cart = req.session?.cart || [];
    if (cart.length === 0) {
      return res.redirect('/cart');
    }

    const { name, phone, address } = req.body;

    // Find or create customer
    let customer = await customerService.findByPhone(phone);
    let customerId;
    
    if (customer) {
      customerId = customer.id_customer;
    } else {
      const newCustomer = await customerService.create({
        name_customer: name,
        phone_customer: phone,
        address_customer: address,
        gender_customer: 'Khac' // default
      });
      customerId = newCustomer.id; // note: insertRow in base service returns { ok: true, id: ... }
    }

    // Fetch a default staff for online orders
    const db = require('../../config/db');
    const [staffs] = await db.execute('SELECT id_staff FROM staff LIMIT 1');
    const defaultStaffId = staffs.length > 0 ? staffs[0].id_staff : 1;

    // Create sales invoice and details
    const invoiceData = {
      id_staff: defaultStaffId, 
      id_customer: customerId,
      prescription_image: req.file ? '/uploads/' + req.file.filename : null
    };

    const items = cart.map(item => ({
      id_medicine: item.id_medicine,
      quantity_sales: item.quantity,
      price: item.price
    }));

    const result = await salesInvoiceService.create(invoiceData, items);

    // Update status to pending
    await salesInvoiceService.updateStatus(result.id, 'cho_xu_ly');

    // Clear cart
    req.session.cart = [];

    // Redirect to success page
    res.redirect(`/checkout/success?orderId=${result.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi máy chủ khi đặt hàng');
  }
};

exports.checkoutSuccess = (req, res) => {
  res.render('client/success', {
    layout: 'layouts/client',
    title: 'Đặt hàng thành công',
    orderId: req.query.orderId,
    currentUser: req.session?.user || null,
    cart: []
  });
};
