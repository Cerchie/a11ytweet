//tests for our auth middleware

const { request } = require('../app')
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config')
const db = require('../db')
const bcrypt = require('bcrypt')
const app = require('../app')
const request = require('request')
let testUserToken

//setting up tests
beforeEach(async function () {
    const hashedPword = await bcrypt.hash(
        'secretsdontmakefriends',
        BCRYPT_WORK_FACTOR
    )
    await db.query(`INSERT INTO users VALUES ('testuser1', $1)`, [hashedPword])
    const testUser = { username: 'testuser1' }
    testUserToken = jwt.sign(testUser, SECRET_KEY)
})

describe('GET 200', function () {
    test('returns 200 status code', async function () {
        const response = await request(app).get(`/ROUTEHERE`)
        expect(response.statusCode).toBe(200)
    })
})
describe('GET 401', function () {
    test('returns 401 status for not logged in', async function () {
        const response = await request(app).get(`/INACCESSIBLEROUTEHERE`)
        expect(response.statusCode).toBe(401)
    })
    test('returns 401 status for bad token', async function () {
        const response = await request(app)
            .get(`/INACCESSIBLEROUTEHERE`)
            .send({ _token: 'bad token' })
        expect(response.statusCode).toBe(401)
    })
})
//adapted from http://curric.rithmschool.com/springboard/lectures/express-hashing-jwts/
