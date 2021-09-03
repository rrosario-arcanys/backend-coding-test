'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const swaggerUi = require('swagger-ui-express');

const swaggerDocs = require('./docs');

const RidesController = require('../src/rides/rides.controller');

module.exports = (db) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  app.get('/health', (req, res) => res.send('Healthy'));

  app.post('/rides', jsonParser, (req, res) =>
    RidesController.createRide(req, res, db),
  );

  app.get('/rides', (req, res) =>
    RidesController.getRides(req, res, db),
  );

  app.get('/rides/:id', (req, res) =>
    RidesController.getRide(req, res, db),
  );

  return app;
};
