//tests for our auth middleware

const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config")
const db = require("../db")
const bcrypt = require("bcrypt")
const app = require("../app")
const jwt = require("jsonwebtoken")
const request = require("supertest")
let testUserToken

//setting up tests
beforeEach(async function () {
    const hashedPword = await bcrypt.hash(
        "secretsdontmakefriends",
        BCRYPT_WORK_FACTOR
    )
    await db.query(`INSERT INTO users VALUES ('testuser1', $1)`, [hashedPword])
    const testUser = { username: "testuser1" }
    testUserToken = jwt.sign(testUser, SECRET_KEY)
})

describe("GET 401", function () {
    test("returns 401 status for not logged in", async function () {
        const response = await request(app).get(`/users/testuser1`)
        expect(response.statusCode).toBe(401)
    })
    test("returns 401 status for bad token", async function () {
        const response = await request(app)
            .get(`/users/testuser1`)
            .send({ _token: "bad token" })
        expect(response.statusCode).toBe(401)
    })
})
//adapted from http://curric.rithmschool.com/springboard/lectures/express-hashing-jwts/
