import * as React from 'react'
import { useState } from 'react'
import GoHome from './GoHome'

const Login = ({ login }) => {
    //setting initial state var
    const INITIAL_STATE = {
        username: '',
        password: '',
    }
    //form data and errs in state
    const [formData, setFormData] = useState(INITIAL_STATE)
    const [formErrors, setFormErrors] = useState([])
    //handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((formData) => ({
            ...formData,
            [name]: value,
        }))
    }

    function goHome() {
        let history = useHistory()
        history.push('/gohome')
    }
    //handles form submit
    async function handleSubmit(e) {
        e.preventDefault()
        let result = await login(formData)
        console.log(result)
        if (result.success) {
            goHome()
        } else {
            setFormErrors(result.errors)
        }
        setFormData(INITIAL_STATE)
    }

    //making debugging easier
    console.debug(
        'Login',
        'login=',
        typeof login,
        'formData=',
        formData,
        'formErrors=',
        formErrors
    )

    return (
        <form onSubmit={handleSubmit}>
            <>
                <h1>Login</h1>
                <label for="username">Username</label>
                <input
                    id="username"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                />
            </>
            <>
                <label for="password">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                />
            </>

            <button
                type="submit"
                className="btn btn-primary float-right"
                onSubmit={handleSubmit}
            >
                Submit
            </button>
        </form>
    )
}
//code adapted from my project https://github.com/Cerchie/react-jobly/blob/main/frontend/src/Login.js
export default Login
