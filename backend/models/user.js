"use strict"

const db = require("../db") //gotta be able to post to db
const bcrypt = require("bcrypt") //using bcrypt

const { BCRYPT_WORK_FACTOR } = require("../config.js") //limits length of bcrypt output
const { password } = require("../db")
const {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} = require("../expressError")
const { get } = require("../app")
const { sqlForPartialUpdate } = require("../helpers/partialSql")
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
        throw new UnauthorizedError("Invalid password")
    }
    ///to register a user...
    static async register(data) {
        const duplicateCheck = await db.query(
            `SELECT username 
              FROM users 
              WHERE username = $1`,
            [data.username]
        )

        if (duplicateCheck.rows[0]) {
            throw new ExpressError(
                `There already exists a user with username '${data.username}`,
                400
            )
        }

        const hashedPassword = await bcrypt.hash(
            data.password,
            BCRYPT_WORK_FACTOR
        )

        const result = await db.query(
            `INSERT INTO users 
                (username, password) 
              VALUES ($1, $2) 
              RETURNING username, password`,
            [data.username, hashedPassword]
        )

        return result.rows[0]
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
            throw new NotFoundError("user not found")
        }
        return user
    }

    //updating one user-- inputs MUST BE VALIDATED or poses security risk
    static async update(username, data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR)
        } //hashing pword

        const { setCols, values } = sqlForPartialUpdate(data, {
            username: "username",
        })
        const usernameVarIdx = "$" + (values.length + 1)

        const querySql = `UPDATE users 
                            SET ${setCols} 
                            WHERE username = ${usernameVarIdx} 
                            RETURNING username`
        const result = await db.query(querySql, [...values, username])
        const user = result.rows[0]

        if (!user) throw new NotFoundError(`No user: ${username}`)
        delete user.password //delete operator removes pword
        return user
    }

    //deleting one user
    static async remove(username) {
        let res = await db.query(
            `DELETE 
            FROM users
            WHERE username = $1
            RETURNING username`,
            [username]
        )
        const user = res.rows[0]
        if (!user) throw new NotFoundError("this username is not found")
    }
}
//code adapted from solution to jobly-react in Springboard
module.exports = User
