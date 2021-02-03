"use strict"
const jsonschema = require("jsonschema")

const express = require("express")
const { ensureCorrectUser, ensureLoggedIn } = require("../middleware/auth")
const { BadRequestError } = require("../expressError")
const User = require("../models/user")
const { createToken } = require("../helpers/tokens")
const userNewSchema = require("../schemas/userNew.json")
const userUpdateSchema = require("../schemas/userUpdate.json")
//TODO-- add schemas
const router = express.Router()

router.post("/", async function (req, res, next) {
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
//get route
router.get("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username)
        return res.json({ user })
    } catch (err) {
        return next(err)
    }
})
//patch route for updates
router.patch("/:username", ensureLoggedIn, async function (req, res, next) {
    try {
        const validation = validate(req.body, userUpdateSchema)
        if (!validation.valid) {
            throw new ExpressError(
                validation.errors.map((e) => e.stack),
                400
            )
        }
        const user = await User.update(req.params.username, req.body)
        return res.json({ user })
    } catch (err) {
        return next(err)
    }
})
//delete route
router.delete("/:username", ensureCorrectUser, async function (req, res, next) {
    try {
        await User.remove(req.params.username)
        return res.json({ message: "User deleted" })
    } catch (err) {
        return next(err)
    }
})
//login route
router.post("/login", async function (req, res, next) {
    try {
        const user = await User.authenticate(req.body)
        const token = createToken(user)
        return res.json({ token })
    } catch (err) {
        return next(err)
    }
})

module.exports = router
//code partially adapted from Springboard solution https://github.com/Cerchie/react-jobly/blob/main/backend/routes/users.js
