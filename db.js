const path = require('path');
const Datastore = require('nedb');

const streets = new Datastore({ filename: path.join(__dirname, 'streets.db') });
const houses = new Datastore({ filename: path.join(__dirname, 'houses.db') });

// Початкові дані: 3 вулиці, по 2 будинки на кожній
const streetsData = [
  { _id: 's1', name: 'вулиця Городоцька', district: 'Залізничний' },
  { _id: 's2', name: 'вулиця Личаківська', district: 'Личаківський' },
  { _id: 's3', name: 'проспект Свободи', district: 'Галицький' }
];

const housesData = [
  { streetId: 's1', number: '12', floors: 4 },
  { streetId: 's1', number: '34', floors: 5 },
  { streetId: 's2', number: '7', floors: 3 },
  { streetId: 's2', number: '21', floors: 4 },
  { streetId: 's3', number: '5', floors: 4 },
  { streetId: 's3', number: '18', floors: 5 }
];

// Завантажує бази та заповнює їх даними. Сервер стартує тільки після цього.
function init(callback) {
  streets.loadDatabase((err) => {
    if (err) return callback(err);
    houses.loadDatabase((err2) => {
      if (err2) return callback(err2);
      streets.remove({}, { multi: true }, (err3) => {
        if (err3) return callback(err3);
        houses.remove({}, { multi: true }, (err4) => {
          if (err4) return callback(err4);
          streets.insert(streetsData, (err5) => {
            if (err5) return callback(err5);
            houses.insert(housesData, (err6) => {
              if (err6) return callback(err6);
              console.log('Базу заповнено: вулиць ' + streetsData.length +
                          ', будинків ' + housesData.length);
              callback(null);
            });
          });
        });
      });
    });
  });
}

module.exports = { streets, houses, init };
