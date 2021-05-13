const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

beforeAll((done) => {
  randomUsername = Math.random().toString(36);
  request(app)
    .post('/login')
    .send({
      username: 'test',
      email: 'unit-test@test.com',
      password: 'azerty',
    })
    .end((err, response) => {
      token = response.body.token;
      const { userId } = response.body;
      done();
    });
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

// signup
describe('🧑 Testing user creations ', () => {
  test('Create a user with missing data', async (done) =>
    await request(app)
      .post('/signup')
      .send({
        username: 'test2',
        // Missing email for test
        password: 'password',
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));

  test('Create a user with already created email', async (done) =>
    await request(app)
      .post('/signup')
      .send({
        username: 'test2',
        email: 'unit-test@test.com',
        password: 'azerty',
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));

  test('Create a user with already created usename', async (done) =>
    await request(app)
      .post('/signup')
      .send({
        username: 'test',
        email: 'unit-test2@test.com',
        password: 'azerty',
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));

  test('Create a user', (done) =>
    request(app)
      .post('/signup')
      .send({
        username: 'newTest',
        email: 'new.test@gmail.com',
        password: 'azerty',
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));
});

// login
describe('🧑 Testing login ', () => {
  test('Login a user with missing data', async (done) =>
    await request(app)
      .post('/login')
      .send({
        // Missing email for test
        password: 'password',
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));

  test('Login a user with wrong data', async (done) =>
    await request(app)
      .post('/login')
      .send({
        email: 'unit-tested@test.com',
        password: 'azerty',
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));

  test('Login a user with wrong password', async (done) =>
    await request(app)
      .post('/login')
      .send({
        email: 'new.test@gmail.com',
        password: 'test',
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));

  test('Login User', (done) =>
    request(app)
      .post('/login')
      .send({
        username: 'newTest',
        email: 'new.test@gmail.com',
        password: 'azerty',
      })
      .then((response) => {
        id = response.body.userId;
        expect(response.statusCode).toBe(202);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));
});

// update password
describe('🧑 Testing password modification ', () => {
  test('Old password and new password are the same', (done) =>
    request(app)
      .put(`/users/${id}`)
      .send({
        username: 'newTest',
        email: 'new.test@gmail.com',
        oldPassword: 'azerty',
        newPassword1: 'azerty',
        newPassword2: 'azerty',
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));

  test('Wrong old password', (done) =>
    request(app)
      .put(`/users/${id}`)
      .send({
        username: 'newTest',
        email: 'new.test@gmail.com',
        oldPassword: 'test',
        newPassword1: 'azerty',
        newPassword2: 'azerty',
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));

  test('User not found', (done) => {
    const id_test = '606da6d58b016dd81795c302';
    return request(app)
      .put(`/users/${id_test}`)
      .send({
        username: 'test',
        email: 'new.test@gmail.com',
        oldPassword: 'azerty',
        newPassword1: 'test',
        newPassword2: 'qwerty',
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  test('User id with tipo', (done) => {
    const id_test = 'test_tipo';
    return request(app)
      .put(`/users/${id_test}`)
      .send({
        username: 'test',
        email: 'new.test@gmail.com',
        oldPassword: 'azerty',
        newPassword1: 'test',
        newPassword2: 'qwerty',
      })
      .then((response) => {
        expect(response.statusCode).toBe(500);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  test('First new password and second new password are not the same', async (done) =>
    request(app)
      .put(`/users/${id}`)
      .send({
        username: 'newTest',
        email: 'new.test@gmail.com',
        oldPassword: 'azerty',
        newPassword1: 'test',
        newPassword2: 'qwerty',
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));

  test('Change password', (done) =>
    request(app)
      .put(`/users/${id}`)
      .send({
        username: 'newTest',
        email: 'new.test@gmail.com',
        oldPassword: 'azerty',
        newPassword1: 'qwerty',
        newPassword2: 'qwerty',
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

// delete
describe('🧑 Deleting account ', () => {
  test('Delete account with wrong id', (done) =>
    request(app)
      .delete(`/users/test`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));

  test('Delete account', (done) =>
    request(app)
      .delete(`/users/${id}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch((err) => {
        console.log(err);
      }));
});
