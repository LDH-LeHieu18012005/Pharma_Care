const path = require('path');
const express = require('express');
const session = require('./src/config/session');
const registerRoutes = require('./src/routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

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
  res.status(404).render('errors/404', { title: '404' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render('errors/500', { title: '500' });
});

module.exports = app;
