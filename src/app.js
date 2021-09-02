'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerOptions: {
    tryItOutEnabled: false,
    supportedSubmitMethods: [''],
  },
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Rides API Documentation',
      description:
        'This is a simple rides API project used for technical backend exam.',
      contact: {
        name: 'Roxenne Lourdes Rosario',
      },
      servers: ['http://localhost:8010'],
    },
  },
  apis: ['src/app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, swaggerOptions),
);

const RidesController = require('../src/rides/rides.controller');

module.exports = (db) => {
  /**
   * @swagger
   * /health:
   *  get:
   *      summary: Return 'Healthy' string response
   *      responses:
   *          '200':
   *              description: A successful response
   */
  app.get('/health', (req, res) => res.send('Healthy'));

  /**
   * @swagger
   * /rides:
   *  post:
   *      summary: Add a new ride
   *      consumes:
   *          application/json:
   *      parameters:
   *        - in: body
   *          name: ride
   *          description: The ride to create
   *          schema:
   *              type: object
   *              required:
   *                  - startLatitude
   *                  - startLongitude
   *                  - endLatitude
   *                  - endLongitude
   *                  - riderName
   *                  - driverName
   *                  - driverVehicle
   *              properties:
   *                  startLatitude:
   *                      type: integer
   *                  startLongitude:
   *                      type: integer
   *                  endLatitude:
   *                      type: integer
   *                  endLongitude:
   *                      type: integer
   *                  riderName:
   *                      type: string
   *                  driverName:
   *                      type: string
   *                  driverVehicle:
   *                      type: string
   *      responses:
   *          '200':
   *              description: A successful response
   *          'VALIDATION_ERROR':
   *              description: Invalid input values
   *          'SERVER_ERROR':
   *              description: Unknown error
   *
   *
   */
  app.post('/rides', jsonParser, (req, res) =>
    RidesController.createRide(req, res, db),
  );
  /**
   * @swagger
   * /rides:
   *  get:
   *      summary: Get all rides
   *      parameters:
   *        - in: query
   *          name: limit
   *          schema:
   *              type: integer
   *          required: false
   *          description: Numeric value of the number of rides per page. Default is 25
   *        - in: query
   *          name: page
   *          schema:
   *              type: integer
   *          required: false
   *          description: Numeric value of the requested page number. Default is 1
   *      responses:
   *          '200':
   *              description: A successful response
   *          'SERVER_ERROR':
   *              description: Unknown error
   *          'RIDES_NOT_FOUND_ERROR':
   *              description: No rides found
   */
  app.get('/rides', (req, res) =>
    RidesController.getRides(req, res, db),
  );

  /**
   * @swagger
   * /rides/{id}:
   *  get:
   *      summary: Get a ride by ID
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *              type: integer
   *          required: true
   *          description: Numeric ID of the ride to get
   *      responses:
   *          '200':
   *              description: A successful response
   *          'SERVER_ERROR':
   *              description: Unknown error
   *          'RIDES_NOT_FOUND_ERROR':
   *              description: No rides found
   */
  app.get('/rides/:id', (req, res) =>
    RidesController.getRide(req, res, db),
  );
  return app;
};
