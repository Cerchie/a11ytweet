const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')

/** return signed JWT from user data. */

function createToken(user) {
    console.assert(
        user.isAdmin !== undefined,
        'createToken passed user without isAdmin property'
    )

    let payload = {
        username: user.username,
    }

    return jwt.sign(payload, SECRET_KEY)
}

module.exports = { createToken }

//code borrowed from Springboard https://github.com/Cerchie/react-jobly/blob/main/backend/helpers/tokens.js
