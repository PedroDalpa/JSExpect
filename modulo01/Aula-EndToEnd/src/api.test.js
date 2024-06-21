const { describe, it, after, before } = require('mocha');
const supertest = require('supertest');
const assert = require('assert');

describe('API suite test', () => {
  let api;
  before((done) => {
    api = require('./api');
    api.once('listening', done);
  });

  after((done) => {
    api.close(done);
  });

  describe('/contact', () => {
    it('should return contact us page with HTTP status 200', async () => {
      const res = await supertest(api).get('/contact').expect(200);

      assert.strictEqual(res.text, 'contact us page');
    });
  });
  describe('/login', () => {
    it('should return logged in message with HTTP status 200', async () => {
      const res = await supertest(api).post('/login').expect(200).send({
        username: 'pedro',
        password: 'password',
      });

      assert.strictEqual(res.text, 'Logged in as pedro');
    });

    it('should return error in invalid login with HTTP status 401', async () => {
      const res = await supertest(api).post('/login').expect(401).send({
        username: 'a',
        password: 'error',
      });

      assert.ok(res.unauthorized);
      assert.strictEqual(res.text, 'Invalid credentials');
    });
  });

  describe('/404', () => {
    it('should return default page when try access invalid URL', async () => {
      const res = await supertest(api).get('/error').expect(404);

      assert.strictEqual(res.text, 'Page not found');
    });
  });
});
