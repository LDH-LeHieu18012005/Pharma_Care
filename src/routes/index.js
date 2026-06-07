module.exports = (app) => {
  app.use('/', require('./client.routes'));
  app.use('/', require('./auth.routes')); // Mount auth routes on / as well
  app.use('/admin', require('./admin.routes'));
};
