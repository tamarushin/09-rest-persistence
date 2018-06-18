'use strict';

const router = require('../lib/router.js');

router.get('/', (req, res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  let name = req.query.name || '';
  res.write(`This is the month of ${name}`);
  res.end();
});

router.get('/', (req, res) => {
  res.statusCode = 400;
  res.statusMessage = 'Bad Request';
  res.write('Bad Request');
  res.end();
});

router.get('/', (req, res) => {
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.write('Not Found');
  res.end();
});

router.post('/data', (req, res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.write(JSON.stringify(req.body));
  res.end();
});

router.post('/data', (req, res) => {
  res.statusCode = 400;
  res.statusMessage = 'Bad Request';
  res.write('Bad Request');
  res.end();
});



module.exports = {};

