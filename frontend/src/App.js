import Home from './Home'
import LinkList from './LinkList'
import Login from './Login'
import NavBar from './NavBar'
import Signup from './Signup'
import Api from './Api'
import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

//renders not-logged in version of app
function App() {
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

    /** Handles site-wide logout. */
    function logout() {
        setCurrentUser(null)
        setToken(null)
    }

    return (
        <div className="App">
            <header className="App-header">
                <BrowserRouter>
                    <NavBar logout={logout} />
                    <main>
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
                        </Switch>
                    </main>
                </BrowserRouter>
            </header>
        </div>
    )
}

export default App
