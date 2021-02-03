/** Middleware for handling req authorization for routes. */

const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")

/** Middleware: Authenticate user. */

function authenticateJWT(req, res, next) {
    try {
        const tokenFromBody = req.body._token
        const payload = jwt.verify(tokenFromBody, SECRET_KEY)
        req.user = payload // create a current user
        return next()
    } catch (err) {
        return next()
    }
}

/** Middleware: Requires user is authenticated. */

function ensureLoggedIn(req, res, next) {
    if (!req.user) {
        return next({ status: 401, message: "Unauthorized" })
    } else {
        return next()
    }
}

/** Middleware: Requires correct username. */

function ensureCorrectUser(req, res, next) {
    try {
        const tokenStr = req.body._token

        let token = jwt.verify(tokenStr, SECRET_KEY)
        res.locals.username = token.username
        console.log(res.locals)
        if (token.username === req.params.username) {
            return next()
        }

        // throw an error, so we catch it in our catch, below
        throw new Error()
    } catch (err) {
        return next(new ExpressError("Unauthorized", 401))
    }
}

// end

module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    ensureCorrectUser,
}
//adapted from my earlier Springboard project https://github.com/Cerchie/messagely/blob/main/middleware/auth.js
