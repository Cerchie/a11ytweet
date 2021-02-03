// npm packages
const request = require('supertest')

// app imports
const app = require('../../app')

const {
    TEST_DATA,
    afterEachHook,
    afterAllHook,
    beforeEachHook,
} = require('./config')

// global auth variable to store things for all the tests
const TEST_DATA = {}
async function beforeEachHook(TEST_DATA) {
    try {
        // login a user, get a token, store the user ID and token
        const hashedPassword = await bcrypt.hash('secret', 12)
        await db.query(
            `INSERT INTO users (username, password)
                    VALUES ('test', $1)`,
            [hashedPassword]
        )

        const response = await request(app).post('/login').send({
            username: 'test',
            password: 'secret',
        })

        TEST_DATA.userToken = response.body.token
        TEST_DATA.currentUsername = jwt.decode(TEST_DATA.userToken).username
    } catch (error) {
        console.error(error)
    }
}
async function afterEachHook() {
    try {
        await db.query('DELETE FROM users')
    } catch (error) {
        console.error(error)
    }
}

async function afterAllHook() {
    try {
        await db.end()
    } catch (err) {
        console.error(err)
    }
}
beforeEach(async function () {
    await beforeEachHook(TEST_DATA)
})

afterEach(async function () {
    await afterEachHook()
})

afterAll(async function () {
    await afterAllHook()
})

describe('POST /users', function () {
    test('Creates a new user', async function () {
        let dataObj = {
            username: 'whiskey',
        }
        const response = await request(app).post('/users').send(dataObj)
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('token')
    })

    test('Prevents creating a user with duplicate username', async function () {
        const response = await request(app)
            .post('/users')
            .set('authorization', `${TEST_DATA.userToken}`)
            .send({
                username: 'test',
            })
        expect(response.statusCode).toBe(400)
    })

    test('Prevents creating a user without required password field', async function () {
        const response = await request(app).post('/users').send({
            username: 'test',
        })
        expect(response.statusCode).toBe(400)
    })
})

describe('GET /users/:username', function () {
    test('Gets one user', async function () {
        const response = await request(app)
            .get(`/users/${TEST_DATA.currentUsername}`)
            .send({ _token: `${TEST_DATA.userToken}` })
        expect(response.body.user).toHaveProperty('username')
        expect(response.body.user).not.toHaveProperty('password')
        expect(response.body.user.username).toBe('test')
    })

    test('Responds with a 404 if it cannot find the user in question', async function () {
        const response = await request(app)
            .get(`/users/helloimfake`)
            .send({ _token: `${TEST_DATA.userToken}` })
        expect(response.statusCode).toBe(404)
    })
})

describe('PATCH /users/:username', function () {
    test("Updates a single user's username with selective update", async function () {
        const response = await request(app)
            .patch(`/users/${TEST_DATA.currentUsername}`)
            .send({ username: 'xkcd', _token: `${TEST_DATA.userToken}` })
        const user = response.body.user
        expect(user).toHaveProperty('username')
        expect(user.first_name).toBe('xkcd')
        expect(user.username).not.toBe(null)
    })

    test("Updates a single a user's password", async function () {
        const response = await request(app)
            .patch(`/users/${TEST_DATA.currentUsername}`)
            .send({
                _token: `${TEST_DATA.userToken}`,
                password: 'hellothisisafakepword',
            })

        const user = response.body.user
        expect(user).toHaveProperty('username')
        expect(user).toHaveProperty('password')
    })

    test('Prevents a bad user update', async function () {
        const response = await request(app)
            .patch(`/users/${TEST_DATA.currentUsername}`)
            .send({ username: false, _token: `${TEST_DATA.userToken}` })
        expect(response.statusCode).toBe(400)
    })

    test('Forbids a user from editing another user', async function () {
        const response = await request(app)
            .patch(`/users/notmeohno`)
            .send({ password: 'foo12345', _token: `${TEST_DATA.userToken}` })
        expect(response.statusCode).toBe(401)
    })

    test('Responds with a 404 if it cannot find the user in question', async function () {
        // delete user first
        await request(app)
            .delete(`/users/${TEST_DATA.currentUsername}`)
            .send({ _token: `${TEST_DATA.userToken}` })
        const response = await request(app)
            .patch(`/users/${TEST_DATA.currentUsername}`)
            .send({ password: 'foo12345', _token: `${TEST_DATA.userToken}` })
        expect(response.statusCode).toBe(404)
    })
})

describe('DELETE /users/:username', function () {
    test('Deletes a single user', async function () {
        const response = await request(app)
            .delete(`/users/${TEST_DATA.currentUsername}`)
            .send({ _token: `${TEST_DATA.userToken}` })
        expect(response.body).toEqual({ message: 'User deleted' })
    })

    test('Forbids a user from deleting another user', async function () {
        const response = await request(app)
            .delete(`/users/notmeuhoh`)
            .send({ _token: `${TEST_DATA.userToken}` })
        expect(response.statusCode).toBe(401)
    })
})

//adapted from my Springboard project
//https://github.com/Cerchie/jobly/blob/main/__tests__/integration/users.test.js
