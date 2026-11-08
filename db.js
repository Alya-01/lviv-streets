const Datastore = require('nedb');

const streets = new Datastore({ filename: 'streets.db', autoload: true });
const houses = new Datastore({ filename: 'houses.db', autoload: true });

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

streets.count({}, (err, n) => {
  if (!err && n === 0) streets.insert(streetsData);
});
houses.count({}, (err, n) => {
  if (!err && n === 0) houses.insert(housesData);
});

module.exports = { streets, houses };
