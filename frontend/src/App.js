import * as React from 'react'
import Home from './Home'
import LinkList from './LinkList'
import Login from './Login'
import NavBar from './NavBar'
import Signup from './Signup'
import GoHome from './GoHome'
import Profile from './Profile'
import Api from './Api'
import UserContext from './UserContext'
import { useEffect, useState } from 'react'
import useLocalStorage from './useLocalStorage'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import UsersLinkList from './UsersLinkList'
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav'

export const TOKEN_STORAGE_ID = 'a11y-token'
//renders not-logged in version of app
function App() {
    const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID)
    const [currentUser, setCurrentUser] = useState(null)
    const [infoLoaded, setInfoLoaded] = useState(false)
    //getting user info on change of token
    useEffect(
        function loadUserInfo() {
            console.debug('App useEffect loadUserInfo', 'token=', token)

            async function getCurrentUser() {
                if (token) {
                    try {
                        let { username } = jwt.decode(token)
                        // put the token on the Api class so it can use it to call the API.
                        Api.token = token
                        let currentUser = await Api.getCurrentUser(username)
                        setCurrentUser(currentUser)
                    } catch (err) {
                        console.error('App loadUserInfo: problem loading', err)
                        console.log('setting CurrentUser to null')
                        setCurrentUser(null)
                    }
                }
                setInfoLoaded(true)
            }
            // set infoLoaded to false while async getCurrentUser runs; once the
            // data is fetched (or even if an error happens!), this will be set back
            // to false to control the spinner.
            setInfoLoaded(false)
            getCurrentUser()
            console.log('from App.js, currentUser', currentUser)
            console.log('from App.js, setCurrentUser', setCurrentUser)
        },
        [token]
    )

    //function for passing in to allow user to signup
    async function signupUser(signupData) {
        try {
            let token = await Api.signup(signupData)
            setToken(token)
            let currentUser = await Api.getCurrentUser(signupData.username)
            setCurrentUser(currentUser)
            return { success: true }
        } catch (errors) {
            console.error('signup failed', errors)
            return { success: false, errors }
        }
    }
    //passing in to user to allow login
    async function loginUser(signupData) {
        try {
            let token = await Api.login(signupData)
            setToken(token)
            return { success: true }
        } catch (errors) {
            console.error('login failed', errors)
            return { success: false, errors }
        }
    }
    //passing in to profile to allow update
    async function saveProfile(data) {
        try {
            let user = await Api.saveProfile(data)
            setCurrentUser(user)
            return { success: true }
        } catch (errors) {
            console.error('update failed', errors)
            return { success: false, errors }
        }
    }
    /** Handles site-wide logout. */
    function logout() {
        setCurrentUser(null)
        setToken(null)
    }
    if (currentUser) {
        return (
            <>
                <SkipNavLink />
                <BrowserRouter>
                    <UserContext.Provider
                        value={{ currentUser, setCurrentUser }}
                    >
                        <NavBar logout={logout} />
                        <SkipNavContent />
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/links">
                                <LinkList />
                            </Route>
                            <Route exact path="/login">
                                <Login login={loginUser} />
                            </Route>
                            <Route exact path="/signup">
                                <Signup signupUser={signupUser} />
                            </Route>
                            <Route exact path="/userlinks">
                                <UsersLinkList />
                            </Route>
                            <Route exact path="/profile">
                                <Profile saveProfile={saveProfile} />
                            </Route>
                            <Route exact path="/gohome">
                                <GoHome />
                            </Route>
                        </Switch>
                    </UserContext.Provider>
                </BrowserRouter>
            </>
        )
    }
    //returning logged out routes
    return (
        <>
            <SkipNavLink />
            <BrowserRouter>
                <UserContext.Provider value={{ currentUser, setCurrentUser }}>
                    <NavBar />
                    <SkipNavContent />
                    <main role="main" id="main-from-app">
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/links">
                                <LinkList />
                            </Route>
                            <Route exact path="/login">
                                <Login login={loginUser} />
                            </Route>
                            <Route exact path="/signup">
                                <Signup signupUser={signupUser} />
                            </Route>
                            <Route exact path="/profile">
                                <Profile />
                            </Route>
                        </Switch>
                    </main>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default App
