const request = require('supertest');
const server = require('./server');

describe('server', () => {
  it('should set the testing environment', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })

  describe('GET /', () => {
    it('should return 200', () => {
      return request(server).get('/')
      .then(res => {
        expect(res.status).toBe(200);
      })
    })
  })
});