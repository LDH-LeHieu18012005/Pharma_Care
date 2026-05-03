const authService = require('../../services/auth.service');

module.exports = {
  async showLogin(req, res, next) {
    try {
      return res.render('client/auth/login', { title: 'Đăng nhập' });
    } catch (error) { return next(error); }
  },

  async showRegister(req, res, next) {
    try {
      return res.render('client/auth/register', { title: 'Đăng ký' });
    } catch (error) { return next(error); }
  },

  async register(req, res, next) {
    try {
      const result = await authService.registerCustomer(req.body || {});
      if (!result.ok) return res.render('client/auth/register', { title: 'Đăng ký', error: result.message });
      return res.redirect('/login');
    } catch (error) { return next(error); }
  },

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body.email, req.body.password);
      if (!result.ok) return res.render('client/auth/login', { title: 'Đăng nhập', error: result.message });
      req.session.user = result.user;
      return res.redirect('/');
    } catch (error) { return next(error); }
  },

  async logout(req, res, next) {
    try {
      req.session.destroy(() => res.redirect('/login'));
    } catch (error) { return next(error); }
  },

  async showChangePassword(req, res, next) {
    try {
      return res.render('client/auth/change-password', { title: 'Đổi mật khẩu' });
    } catch (error) { return next(error); }
  },

  async changePassword(req, res, next) {
    try {
      const result = await authService.changePassword(req.session.user.id, req.body.old_password, req.body.new_password);
      if (!result.ok) return res.render('client/auth/change-password', { title: 'Đổi mật khẩu', error: result.message });
      return res.redirect('/profile');
    } catch (error) { return next(error); }
  }
};
