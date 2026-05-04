module.exports = (app) => {
  app.use('/', require('./auth.routes'));
  app.use('/admin', require('./admin.routes'));
};
