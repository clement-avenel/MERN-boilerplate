const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

afterAll(() => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
});

describe('⚠ Testing error handlers of router', () => {
  test('Handle 404', () =>
    request(app)
      .get('/test')
      .then((response) => {
        expect(response.statusCode).toBe(404);
      })
      .catch((err) => {
        console.error(err);
      }));
  test('Require authorization', () =>
    request(app)
      .get('/data/all')
      .then((response) => {
        expect(response.statusCode).toBe(401);
      })
      .catch((err) => {
        console.error(err);
      }));
});
