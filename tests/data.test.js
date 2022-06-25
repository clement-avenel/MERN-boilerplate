const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

let token;
let userId;
let id;

beforeAll((done) => {
  request(app)
    .post('/login')
    .send({
      email: 'unit-test@test.com',
      password: 'azerty',
    })
    .end((err, response) => {
      token = response.body.token;
      userId = response.body.userId;
      done();
    });
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

describe('📄 Testing getting all datas', () => {
  test('Get all datas', () =>
    request(app)
      .get('/data/all')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      })
      .catch((err) => {
        console.error(err);
      }));
});

describe('📄 testing data creation', () => {
  test('Create data with missing data', () =>
    request(app)
      .post('/data')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
      })
      .catch((err) => {
        console.error(err);
      }));

  test('Create data', () =>
    request(app)
      .post('/data')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId,
        name: 'test',
      })
      .then((response) => {
        id = response.body.id;
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('application/json');
      })
      .catch((err) => {
        console.error(err);
      }));
});

describe('📄 Testing getting data by Id', () => {
  test('Find data by wrong id', () =>
    request(app)
      .get(`/data/t`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.type).toBe('application/json');
      })
      .catch((err) => {
        console.error(err);
      }));

  test('Find data by id', () =>
    request(app)
      .get(`/data/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      })
      .catch((err) => {
        console.error(err);
      }));
});

describe('📄 Testing data modification', () => {
  test('Update data with wrong id', () =>
    request(app)
      .put(`/data/t`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId,
        name: 'test',
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
      })
      .catch((err) => {
        console.error(err);
      }));

  test('Update data', () =>
    request(app)
      .put(`/data/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId,
        name: 'test',
      })
      .then((response) => {
        expect(response.statusCode).toBe(202);
        expect(response.type).toBe('application/json');
      })
      .catch((err) => {
        console.error(err);
      }));
});

describe('📄 Testing deleting datas', () => {
  test('Delete data with wrong id', () =>
    request(app)
      .delete(`/data/t`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
      })
      .catch((err) => {
        console.error(err);
      }));

  test('Delete data', () =>
    request(app)
      .delete(`/data/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      })
      .catch((err) => {
        console.error(err);
      }));
});
