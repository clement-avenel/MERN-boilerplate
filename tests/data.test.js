const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

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
  test('Get all datas', async (done) =>
    request(app)
      .get('/data/all')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));
});

describe('📄 testing data creation', () => {
  test('Create data with missing data', async (done) =>
    request(app)
      .post('/data')
      .set('Authorization', `Bearer ${token}`)
      .send({
        dataId: 'zdz6dzhui78ZD9zdjij2dj5a0',
        userId,
        dateIn: '2010-04-03',
        // Missing dateOut for test
        ratings: {
          thermal: 3,
          sound: 3,
          district: 3,
          configuration: 3,
          storage: 3,
          brightness: 3,
        },
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));

  test('Create data', (done) =>
    request(app)
      .post('/data')
      .set('Authorization', `Bearer ${token}`)
      .send({
        dataId: 'zdz6dzhui78ZD9zdjij2dj5a0',
        userId,
        dateIn: '2010-04-03',
        dateOut: '2020-01-01',
        ratings: {
          thermal: 3,
          sound: 3,
          district: 3,
          configuration: 3,
          storage: 3,
          brightness: 3,
        },
        comment: 'comment',
      })
      .then((response) => {
        id = response.body.id;
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));
});

describe('📄 Testing getting data by Id', () => {
  test('Find data by wrong id', async (done) =>
    request(app)
      .get(`/data/t`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));

  test('Find data by id', (done) =>
    request(app)
      .get(`/data/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));
});

describe('📄 Testing data modification', () => {
  test('Update data with wrong id', async (done) =>
    request(app)
      .put(`/data/t`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        dataId: 'zdz6dzhui78ZD9zdjij2dj5a0',
        userId,
        dateIn: '2010-04-03',
        dateOut: '2020-01-01',
        ratings: {
          thermal: 4,
          sound: 4,
          district: 4,
          configuration: 4,
          storage: 4,
          brightness: 4,
        },
        comment: 'comment',
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));

  test('Update data', (done) =>
    request(app)
      .put(`/data/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        dataId: 'zdz6dzhui78ZD9zdjij2dj5a0',
        userId,
        dateIn: '2010-04-03',
        dateOut: '2020-01-01',
        ratings: {
          thermal: 4,
          sound: 4,
          district: 4,
          configuration: 4,
          storage: 4,
          brightness: 4,
        },
        comment: 'comment',
      })
      .then((response) => {
        expect(response.statusCode).toBe(202);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));
});

describe('📄 Testing deleting datas', () => {
  test('Delete data with wrong id', async (done) =>
    request(app)
      .delete(`/data/t`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));

  test('Delete data', (done) =>
    request(app)
      .delete(`/data/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));
});
