const authService = require('../services/auth.service');
module.exports = {
  showLogin(req, res) { res.render('auth/login', { title: 'Đăng nhập', error: null, layout: 'layouts/main' }); },
  async login(req, res, next) {
    try {
      const result = await authService.login(req.body.username, req.body.password);
      if (!result.ok) return res.render('auth/login', { title: 'Đăng nhập', error: result.message, layout: 'layouts/main' });
      req.session.user = result.user;
      return res.redirect('/admin');
    } catch (e) { next(e); }
  },
  logout(req, res) { req.session.destroy(() => res.redirect('/login')); },
  showChangePassword(req, res) {
    res.render('auth/change-password', { title: 'Đổi mật khẩu', error: null, success: null, layout: 'layouts/main' });
  },
  async changePassword(req, res, next) {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;
      if (newPassword !== confirmPassword) {
        return res.render('auth/change-password', { title: 'Đổi mật khẩu', error: 'Mật khẩu xác nhận không khớp', success: null, layout: 'layouts/main' });
      }
      const result = await authService.changePassword(req.session.user.id, oldPassword, newPassword);
      if (!result.ok) {
        return res.render('auth/change-password', { title: 'Đổi mật khẩu', error: result.message, success: null, layout: 'layouts/main' });
      }
      res.render('auth/change-password', { title: 'Đổi mật khẩu', error: null, success: 'Đổi mật khẩu thành công!', layout: 'layouts/main' });
    } catch (e) { next(e); }
  }
};
