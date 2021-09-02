'use strict';

const { text } = require('express');
const request = require('supertest');
const assert = require('assert');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

describe('API tests', () => {
  let rides;

  before((done) => {
    db.serialize((err) => {
      if (err) {
        return done(err);
      }

      buildSchemas(db);

      done();
    });
  });

  beforeEach(function () {
    rides = {
      start_lat: 0, //invalid
      start_long: 0, //invalid
      end_lat: 50,
      end_long: 100,
      rider_name: 'Rider Name',
      driver_name: 'Driver Name',
      driver_vehicle: 'Vehicle Name',
    };
  });

  describe('GET /health', () => {
    it('should return health', (done) => {
      request(app)
        .get('/health')
        .expect('Content-Type', /text/)
        .expect(200, done);
    });
  });

  describe('POST /rides', () => {
    it('should add a ride successfully', (done) => {
      request(app).post('/rides').send(rides).expect(200, done);
    });

    it('should return validation error when start latitude and longitude values are invalid', (done) => {
      rides.start_lat = 100;
      rides.start_long = 200;

      const expected_response = {
        error_code: 'VALIDATION_ERROR',
        message:
          'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
      };

      request(app)
        .post('/rides')
        .send(rides)
        .expect(200)
        .end(function (err, res) {
          assert.deepEqual(res.body, expected_response);
          return done();
        });
    });

    it('should return validation error when start longitude values are invalid', (done) => {
      rides.end_lat = 100;
      rides.end_long = 200;

      const expected_response = {
        error_code: 'VALIDATION_ERROR',
        message:
          'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
      };

      request(app)
        .post('/rides')
        .send(rides)
        .expect(200)
        .end(function (err, res) {
          assert.deepEqual(res.body, expected_response);
          return done();
        });
    });

    it('should return validation error when driver name is empty string', (done) => {
      rides.driver_name = '';

      const expected_response = {
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
      };

      request(app)
        .post('/rides')
        .send(rides)
        .expect(200)
        .end(function (err, res) {
          assert.deepEqual(res.body, expected_response);
          return done();
        });
    });

    it('should return validation error when driver name is not a string', (done) => {
      rides.driver_name = 123;

      const expected_response = {
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
      };

      request(app)
        .post('/rides')
        .send(rides)
        .expect(200)
        .end(function (err, res) {
          assert.deepEqual(res.body, expected_response);
          return done();
        });
    });

    it('should return validation error when rider name is empty string', (done) => {
      rides.rider_name = '';

      const expected_response = {
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
      };

      request(app)
        .post('/rides')
        .send(rides)
        .expect(200)
        .end(function (err, res) {
          assert.deepEqual(res.body, expected_response);
          return done();
        });
    });

    it('should return validation error when rider name is not a string', (done) => {
      rides.rider_name = 123;

      const expected_response = {
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
      };

      request(app)
        .post('/rides')
        .send(rides)
        .expect(200)
        .end(function (err, res) {
          assert.deepEqual(res.body, expected_response);
          return done();
        });
    });

    it('should return validation error when driver vehicle is empty string', (done) => {
      rides.driver_vehicle = '';

      const expected_response = {
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
      };

      request(app)
        .post('/rides')
        .send(rides)
        .expect(200)
        .end(function (err, res) {
          assert.deepEqual(res.body, expected_response);
          return done();
        });
    });

    it('should return validation error when driver vehicle is not a string', (done) => {
      rides.driver_vehicle = 123;

      const expected_response = {
        error_code: 'VALIDATION_ERROR',
        message: 'Rider name must be a non empty string',
      };

      request(app)
        .post('/rides')
        .send(rides)
        .expect(200)
        .end(function (err, res) {
          assert.deepEqual(res.body, expected_response);
          return done();
        });
    });
  });

  describe('GET /rides', () => {
    it('should return all rides', (done) => {
      request(app).get('/rides').expect(200, done);
    });
  });

  describe('GET /rides/{id}', () => {
    it('should return ride given the id', (done) => {
      request(app).get('/rides/1').expect(200, done);
    });
  });
});
