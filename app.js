const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('./src/config/session');
const registerRoutes = require('./src/routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Layout engine — mặc định dùng layouts/admin.ejs cho tất cả page
app.use(expressLayouts);
app.set('layout', 'layouts/admin');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session);

app.use((req, res, next) => {
  res.locals.currentUser = req.session?.user || null;
  next();
});

app.use(express.static(path.join(__dirname, 'src/public')));

registerRoutes(app);

app.use((req, res) => {
  res.status(404).render('errors/404', { title: '404', layout: 'layouts/main' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render('errors/500', { title: '500', layout: 'layouts/main' });
});

module.exports = app;
