import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import UserContext from './UserContext'
// TODO-- ADD LOGIC SO PROFILE ONLY APPEARS WHEN LOGGED IN
function NavBar({ logout }) {
    const { currentUser } = useContext(UserContext)
    console.debug('Navigation', 'currentUser=', currentUser)

    function loggedOutNav() {
        return (
            <div>
                Welcome to A11y!
                <div>
                    <Link to="/login">Login</Link>
                </div>
                <div>
                    <Link to="/signup">Signup</Link>
                </div>
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>
                    <Link to="/links">a11y repos</Link>
                </div>
            </div>
        )
    }

    function loggedInNav() {
        return (
            <>
                <Link exact to="/" className="navbar-brand">
                    Welcome {currentUser.username}!
                </Link>
                <nav className="ml-auto" navbar>
                    <p>Hi {currentUser.username}!</p>
                    <div>
                        <Link to="/links">a11y repos</Link>
                    </div>
                    <div>
                        <Link to="/profile">Edit Profile</Link>
                    </div>
                    <div>
                        <Link to="/links">Your Links</Link>
                    </div>
                    <div>
                        <Link className="nav-link" to="/" onClick={logout}>
                            Log out{' '}
                            {currentUser.first_name || currentUser.username}
                        </Link>
                    </div>
                </nav>
            </>
        )
    }

    return (
        <nav className="Navigation navbar navbar-expand-md">
            <Link className="navbar-brand" to="/">
                A11yTweet
            </Link>
            {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    )
}

export default NavBar

//code adapted from my Springboard projecthttps://github.com/Cerchie/react-jobly/blob/main/frontend/src/NavBar.js
