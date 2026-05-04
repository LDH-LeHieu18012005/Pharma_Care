function requireAdmin(req, res, next) {
  if (req.session?.user?.permission !== 'admin') {
    return res.status(403).render('errors/403', { title: 'Forbidden' });
  }
  return next();
}

function requireAdminOrStaff(req, res, next) {
  const p = req.session?.user?.permission;
  if (p !== 'admin' && p !== 'staff') {
    return res.status(403).render('errors/403', { title: 'Forbidden' });
  }
  return next();
}

module.exports = { requireAdmin, requireAdminOrStaff };
