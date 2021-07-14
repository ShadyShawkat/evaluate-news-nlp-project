const request = require('supertest')
const app = require('../src/server/index')

describe('Testing Api Endpoint', () => {
    test('should return status code of 200', () => {
        request(app)
            .get('/getData')
            .send({
                url: 'https://www.medicalnewstoday.com/articles/8933',
            }).then(res => {
                expect(res.statusCode).toEqual(200)
            })
    })
})