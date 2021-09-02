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
            version: "1.0.0",
            title: "Rides API",
            description: "This is a simple rides API project.",
            contact: {
                name: "Roxenne Lourdes Rosario"
            },
            servers: ["http://localhost:8010"]
        }
    },
    apis: ["src/app.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerOptions));

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
    app.post('/rides', jsonParser, (req, res) => {
        const startLatitude = Number(req.body.start_lat);
        const startLongitude = Number(req.body.start_long);
        const endLatitude = Number(req.body.end_lat);
        const endLongitude = Number(req.body.end_long);
        const riderName = req.body.rider_name;
        const driverName = req.body.driver_name;
        const driverVehicle = req.body.driver_vehicle;

        if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
            });
        }

        if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
            });
        }

        if (typeof riderName !== 'string' || riderName.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string'
            });
        }

        if (typeof driverName !== 'string' || driverName.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string'
            });
        }

        if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string'
            });
        }

        var values = [req.body.start_lat, req.body.start_long, req.body.end_lat, req.body.end_long, req.body.rider_name, req.body.driver_name, req.body.driver_vehicle];
        
        const result = db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values, function (err) {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }

            db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, function (err, rows) {
                if (err) {
                    return res.send({
                        error_code: 'SERVER_ERROR',
                        message: 'Unknown error'
                    });
                }

                res.send(rows);
            });
        });
    });

    /**
     * @swagger
     * /rides:
     *  get:
     *      summary: Get all rides
     *      responses:
     *          '200':
     *              description: A successful response
     *          'SERVER_ERROR':
     *              description: Unknown error
     *          'RIDES_NOT_FOUND_ERROR':
     *              description: No rides found
     */
    app.get('/rides', (req, res) => {
        db.all('SELECT * FROM Rides', function (err, rows) {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }

            if (rows.length === 0) {
                return res.send({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                });
            }

            res.send(rows);
        });
    });

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
    app.get('/rides/:id', (req, res) => {
        db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`, function (err, rows) {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }

            if (rows.length === 0) {
                return res.send({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                });
            }

            res.send(rows);
        });
    });

    return app;
};
