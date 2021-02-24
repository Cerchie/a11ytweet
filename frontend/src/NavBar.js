import * as React from 'react'
import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import UserContext from './UserContext'

function NavBar({ logout }) {
    //so we can focus for a11y
    const linkInput = useRef(null)

    //using the ref to focus the element
    function handleRender(linkInput) {
        linkInput.current.focus()
    }

    if (useContext(UserContext) !== undefined) {
        const { currentUser } = useContext(UserContext)

        function loggedOutNav() {
            return (
                <nav
                    role="navigation"
                    aria-label="Nav"
                    className="rounded bg-blue-50 text-red-600 text-2xl p-6 m-6"
                >
                    <ul>
                        <li ref={linkInput}>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/links">a11y repos</Link>
                        </li>
                    </ul>
                </nav>
            )
        }

        function loggedInNav() {
            return (
                <>
                    <h1 className="rounded bg-blue-50 text-red-600 text-2xl p-6 m-6">
                        <Link exact to="/" className="navbar-brand">
                            Hi {currentUser.username}!
                        </Link>
                    </h1>
                    <nav
                        role="navigation"
                        aria-label="Nav"
                        className="rounded bg-blue-50 text-red-600 text-2xl p-6 m-6"
                    >
                        <ul>
                            <li>
                                <Link to="/profile">Edit Profile</Link>
                            </li>
                            <li>
                                <Link to="/userlinks">Your Links</Link>
                            </li>
                            <li>
                                <Link to="/links">
                                    List of a11y-related links
                                </Link>
                            </li>
                            <li>
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
                {currentUser ? loggedInNav() : loggedOutNav()}
            </nav>
        )
    }
    return <> No navbar. </>
}

export default NavBar

//code adapted from my Springboard projecthttps://github.com/Cerchie/react-jobly/blob/main/frontend/src/NavBar.js
