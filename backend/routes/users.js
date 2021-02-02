'use strict'
const jsonschema = require('jsonschema')

const express = require('express')
const { ensureCorrectUser, ensureLoggedIn } = require('../middleware/auth')
const { BadRequestError } = require('../expressError')
const User = require('../models/user')
const { createToken } = require('../helpers/tokens')
const userNewSchema = require('../schemas/userNew.json')
const userUpdateSchema = require('../schemas/userUpdate.json')

const router = express.Router()

router.post('/', async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userNewSchema)
        if (!validator.valid) {
            const errs = validator.errors.map((e) => e.stack)
            throw new BadRequestError(errs)
        }

        const user = await User.register(req.body)
        const token = createToken(user)
        return res.status(201).json({ user, token })
    } catch (err) {
        return next(err)
    }
})
module.exports = router
