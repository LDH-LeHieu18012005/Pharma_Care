const contactService = require('../../services/contact.service');

module.exports = {
  async showForm(req, res, next) {
    try {
      return res.render('client/contact', { title: 'Contact - showForm' });
    } catch (error) {
      return next(error);
    }
  }
,

  async submit(req, res, next) {
    try {
      await contactService.createContact(req.body || {});
      return res.redirect('/contact');
    } catch (error) {
      return next(error);
    }
  }


};
