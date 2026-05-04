const authService = require('../services/auth.service');
module.exports = {
  showLogin(req, res) { res.render('auth/login', { title: 'Đăng nhập', error: null }); },
  async login(req, res, next) {
    try {
      const result = await authService.login(req.body.username, req.body.password);
      if (!result.ok) return res.render('auth/login', { title: 'Đăng nhập', error: result.message });
      req.session.user = result.user;
      return res.redirect('/admin');
    } catch (e) { next(e); }
  },
  logout(req, res) { req.session.destroy(() => res.redirect('/login')); }
};
