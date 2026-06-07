const medicineService = require('../../services/medicine.service');
const medicineTypeService = require('../../services/medicineType.service');

exports.index = async (req, res) => {
  try {
    const medicines = await medicineService.getAll();
    const types = await medicineTypeService.getAll();
    
    res.render('client/home', {
      layout: 'layouts/client',
      title: 'Trang chủ',
      medicines: medicines,
      types: types,
      currentUser: req.session?.user || null,
      cart: req.session?.cart || []
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi máy chủ');
  }
};

exports.productDetail = async (req, res) => {
  try {
    const medicine = await medicineService.getById(req.params.id);
    if (!medicine) return res.status(404).render('errors/404', { title: '404', layout: 'layouts/main' });
    
    // Find related medicines (same type)
    const allMedicines = await medicineService.getAll();
    const related = allMedicines.filter(m => m.id_type === medicine.id_type && m.id_medicine !== medicine.id_medicine).slice(0, 5);

    res.render('client/product', {
      layout: 'layouts/client',
      title: medicine.name_medicine,
      medicine,
      related,
      currentUser: req.session?.user || null,
      cart: req.session?.cart || []
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi máy chủ');
  }
};

exports.search = async (req, res) => {
  try {
    const q = req.query.q || '';
    const type = req.query.type || '';
    const maxPrice = req.query.maxPrice || '';
    
    const results = await medicineService.searchAdvanced(q, type, maxPrice);
    const types = await medicineTypeService.getAll();
    
    res.render('client/search', {
      layout: 'layouts/client',
      title: 'Tìm kiếm',
      q,
      type,
      maxPrice,
      results,
      types,
      currentUser: req.session?.user || null,
      cart: req.session?.cart || []
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi máy chủ');
  }
};
