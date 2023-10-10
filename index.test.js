const request = require('supertest')
const { app, server } = require('./index')

describe('The API', () => {
  it('returns JSON', async () => {
    const res = await request(app)
      .get('/api/blocks')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  afterAll((done) => {
    server.close()
    done()
  })
})
