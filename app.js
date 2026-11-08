const express = require('express');
const { streets, houses } = require('./db');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Сторінка 1: усі вулиці Львова
app.get('/', (req, res, next) => {
  streets.find({}).sort({ name: 1 }).exec((err, list) => {
    if (err) return next(err);
    res.render('streets', { streets: list });
  });
});

// Сторінка 2: будинки на вибраній вулиці
app.get('/street/:id', (req, res, next) => {
  streets.findOne({ _id: req.params.id }, (err, street) => {
    if (err) return next(err);
    if (!street) return res.status(404).send('Вулицю не знайдено');
    houses.find({ streetId: street._id }).sort({ number: 1 }).exec((err2, list) => {
      if (err2) return next(err2);
      res.render('houses', { street, houses: list });
    });
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Помилка сервера');
});

app.listen(PORT, () => {
  console.log(`Сервер запущено: http://localhost:${PORT}`);
});
