// npm packages
const request = require("supertest")
const db = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const { createToken } = require("../helpers/tokens")
// app imports
const app = require("../app")

// global auth variable to store things for all the tests
async function commonBeforeAll() {
    // noinspection SqlWithoutWhere
    await db.query("DELETE FROM users")

    await User.register({
        username: "u1",
        password: "password1",
    })
    await User.register({
        username: "u2",
        password: "password2",
    })
    await User.register({
        username: "u3",
        password: "password3",
    })
}

async function commonBeforeEach() {
    await db.query("BEGIN")
}

async function commonAfterEach() {
    await db.query("ROLLBACK")
}

async function commonAfterAll() {
    await db.end()
}

const u1Token = createToken({ username: "u1" })
const u2Token = createToken({ username: "u2" })

//call callbacks

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

describe("POST /users", function () {
    test("unauth for users", async function () {
        const resp = await request(app)
            .post("/users")
            .send({
                username: "u-new",
                password: "password-new",
            })
            .set("authorization", `Bearer ${u1Token}`)
        expect(resp.statusCode).toEqual(401)
    })

    test("bad request if missing data", async function () {
        const resp = await request(app)
            .post("/users")
            .send({
                username: "u-new",
            })
            .set("authorization", `Bearer ${u1Token}`)
        expect(resp.statusCode).toEqual(400)
    })
})

/************************************** GET /users/:username */

describe("GET /users/:username", function () {
    test("works for same user", async function () {
        const resp = await request(app)
            .get(`/users/u1`)
            .set("authorization", `Bearer ${u1Token}`)
        expect(resp.body).toEqual({
            user: {
                username: "u1",
            },
        })
    })

    test("unauth for other users", async function () {
        const resp = await request(app)
            .get(`/users/u1`)
            .set("authorization", `Bearer ${u2Token}`)
        expect(resp.statusCode).toEqual(401)
    })

    test("unauth for anon", async function () {
        const resp = await request(app).get(`/users/u1`)
        expect(resp.statusCode).toEqual(401)
    })
})

/************************************** PATCH /users/:username */

describe("PATCH /users/:username", () => {
    test("works for same user", async function () {
        const resp = await request(app)
            .patch(`/users/u1`)
            .send({
                username: "New",
            })
            .set("authorization", `Bearer ${u1Token}`)
        expect(resp.body).toEqual({
            user: {
                username: "u1",
            },
        })
    })

    test("unauth if not same user", async function () {
        const resp = await request(app)
            .patch(`/users/u1`)
            .send({
                username: "New",
            })
            .set("authorization", `Bearer ${u2Token}`)
        expect(resp.statusCode).toEqual(401)
    })

    test("unauth for anon", async function () {
        const resp = await request(app).patch(`/users/u1`).send({
            username: "Newish",
        })
        expect(resp.statusCode).toEqual(401)
    })

    test("not found if no such user", async function () {
        const resp = await request(app)
            .patch(`/users/nope`)
            .send({
                username: "Nope",
            })
            .set("authorization", `Bearer ${u1Token}`)
        expect(resp.statusCode).toEqual(404)
    })

    test("works: can set new password", async function () {
        const resp = await request(app)
            .patch(`/users/u1`)
            .send({
                password: "new-password",
            })
            .set("authorization", `Bearer ${u1Token}`)
        expect(resp.body).toEqual({
            user: {
                username: "u1",
            },
        })
        const isSuccessful = await User.authenticate("u1", "new-password")
        expect(isSuccessful).toBeTruthy()
    })
})

/************************************** DELETE /users/:username */

describe("DELETE /users/:username", function () {
    test("works for same user", async function () {
        const resp = await request(app)
            .delete(`/users/u1`)
            .set("authorization", `Bearer ${u1Token}`)
        expect(resp.body).toEqual({ deleted: "u1" })
    })

    test("unauth if not same user", async function () {
        const resp = await request(app)
            .delete(`/users/u1`)
            .set("authorization", `Bearer ${u2Token}`)
        expect(resp.statusCode).toEqual(401)
    })

    test("unauth for anon", async function () {
        const resp = await request(app).delete(`/users/u1`)
        expect(resp.statusCode).toEqual(401)
    })
})
