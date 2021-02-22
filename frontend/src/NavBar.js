import * as React from 'react'
import { useContext, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import UserContext from './UserContext'

function NavBar({ logout }) {
    //so we can focus for a11y
    const linkInput = useRef(null)

    //using the ref to focus the element
    function handleClick() {
        linkInput.current.focus()
    }

    if (useContext(UserContext) !== undefined) {
        const { currentUser } = useContext(UserContext)

        console.debug('Navigation', 'currentUser=', currentUser)

        function loggedOutNav() {
            return (
                <nav>
                    Welcome to A11y!
                    <ul>
                        <li ref={linkInput} onClick={handleClick}>
                            <Link to="/login">Login</Link>
                        </li>
                        <li ref={linkInput} onClick={handleClick}>
                            <Link to="/signup">Signup</Link>
                        </li>
                        <li ref={linkInput} onClick={handleClick}>
                            <Link to="/">Home</Link>
                        </li>
                        <li ref={linkInput} onClick={handleClick}>
                            <Link to="/links">a11y repos</Link>
                        </li>
                    </ul>
                </nav>
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
                        <ul>
                            <li ref={linkInput} onClick={handleClick}>
                                <Link to="/links">a11y repos</Link>
                            </li>
                            <li ref={linkInput} onClick={handleClick}>
                                <Link to="/profile">Edit Profile</Link>
                            </li>
                            <li ref={linkInput} onClick={handleClick}>
                                <Link to="/userlinks">Your Links</Link>
                            </li>
                            <li ref={linkInput} onClick={handleClick}>
                                <Link to="/links">
                                    List of a11y-related links
                                </Link>
                            </li>
                            <li ref={linkInput} onClick={handleClick}>
                                <Link
                                    className="nav-link"
                                    to="/"
                                    onClick={logout}
                                >
                                    Log out{' '}
                                    {currentUser.first_name ||
                                        currentUser.username}
                                </Link>
                            </li>
                        </ul>
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
