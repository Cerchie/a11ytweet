import './App.css'
import NavBar from './NavBar'
import Home from './Home'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
//renders not-logged in version of app
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <BrowserRouter>
                    <Switch>
                        <NavBar />
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/links">
                            <LinkList />
                        </Route>
                        <Route exact path="/login">
                            <Login />
                        </Route>
                        <Route exact path="/signup">
                            <Signup />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </header>
        </div>
    )
}

export default App
