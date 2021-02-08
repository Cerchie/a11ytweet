import React from 'react'

import { NavLink } from 'react-router-dom'

function NavBar() {
    return (
        <nav>
            Welcome to a11yTweet!
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
        </nav>
    )
}

export default NavBar
