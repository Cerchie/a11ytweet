'use strict'

const db = require('../db') //gotta be able to post to db
const bcrypt = require('bcrypt') //using bcrypt

const { BCRYPT_WORK_FACTOR } = require('../config.js') //limits length of bcrypt output
const { password } = require('../db')
const { BadRequestError, NotFoundError } = require('../expressError')
const { get } = require('../app')

//user funcs
//methods adapted from Springboard react-jobly project https://www.springboard.com/workshops/software-engineering-career-track
class User {
    //first things first-- auth query to db

    static async authenticate(username, pword) {
        const res = await db.query(
            `SELECT username,
            password
            FROM USERS
            WHERE username = $1`,
            [username] //$1 for safety
        )
        const user = res.rows[0]
        if (user) {
            const isValid = await bcrypt.compare(pword, user.password)
            if (isValid === true) {
                delete user.password
                return user
            }
        }
        throw new UnauthorizedError('Invalid password')
    }
    ///to register a user...
    static async register({ username, password }) {
        const dupeCheck = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [username]
        )
        if (dupeCheck.rows[0]) {
            throw new BadRequestError(`find a unique useranem`)
        }

        const res = await db.query(
            `INSERT INTo users
            (username,
            password)
            VALUES ($1, $2)`,
            [username, hashedPword]
        )
        const user = res.rows[0]
        return user
    }
    //getting one user
    static async get(username) {
        const res = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [username]
        )
        const user = res.rows[0]

        if (!user) {
            throw new NotFoundError('user not found')
        }
        return user
    }

    //updating one user-- inputs MUST BE VALIDATED or poses security risk
    static async update() {}

    //deleting one user
    static async remove(username) {
        let res = await db.query(
            `DELETE 
            FROM users
            WHERE username = $1
            RETURNING username`,
            [username]
        )
        const user = result.rows[0]
        if (!user) throw new NotFoundError('this username is not found')
    }
}

module.exports = User
