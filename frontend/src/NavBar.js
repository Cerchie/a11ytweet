import * as React from 'react'
import { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import UserContext from './UserContext'
// TODO-- ADD LOGIC SO PROFILE ONLY APPEARS WHEN LOGGED IN
function NavBar({ logout }) {
    if (useContext(UserContext) !== undefined) {
        const { currentUser } = useContext(UserContext)

        console.debug('Navigation', 'currentUser=', currentUser)

        function loggedOutNav() {
            return (
                <>
                    Welcome to A11y!
                    <>
                        <Link to="/login">Login</Link>
                    </>
                    <>
                        <Link to="/signup">Signup</Link>
                    </>
                    <>
                        <Link to="/">Home</Link>
                    </>
                    <>
                        <Link to="/links">a11y repos</Link>
                    </>
                </>
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
                        <>
                            <Link to="/links">a11y repos</Link>
                        </>
                        <>
                            <Link to="/profile">Edit Profile</Link>
                        </>
                        <>
                            <Link to="/userlinks">Your Links</Link>
                        </>
                        <>
                            <Link to="/links">List of a11y-related links</Link>
                        </>
                        <>
                            <Link className="nav-link" to="/" onClick={logout}>
                                Log out{' '}
                                {currentUser.first_name || currentUser.username}
                            </Link>
                        </>
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
    return <> No navbar. </>
}

export default NavBar

//code adapted from my Springboard projecthttps://github.com/Cerchie/react-jobly/blob/main/frontend/src/NavBar.js
