import * as React from 'react'
import { useState } from 'react'
import './styles/ProfileSignup.css'

const Signup = ({ signupUser }) => {
    //setting init state
    const INITIAL_STATE = {
        username: '',
        password: '',
    }

    //saving form data, errors in state
    const [user, setUser] = useState(INITIAL_STATE)
    const [formErrors, setFormErrors] = useState([])
    //makes debugging easier
    console.debug(
        'SignupForm',
        'signup=',
        typeof signup,
        'formData=',
        user,
        'formErrors=',
        formErrors
    )
    //handles changes in form
    const handleChange = (e) => {
        const { name, value } = e.target
        setUser((user) => ({
            ...user,
            [name]: value,
        }))
    }

    //handles form submit
    async function handleSubmit(e) {
        e.preventDefault()
        let result = await signupUser({
            user,
        })
        console.log(user)
        console.log(result)
        if (result.success) {
            alert('signed up!')
        } else {
            setFormErrors(result.errors)
        }

        if (result.success === false) {
            alert('signup not successful')
        }
        console.log(user)
        console.log(result)
        setUser(INITIAL_STATE)
    }
    return (
        <form onSubmit={handleSubmit}>
            <>
                <h1>Change your username/password</h1>
                <label for="username">Username</label>
                <input
                    name="username"
                    id="username"
                    className="form-control"
                    value={user.username}
                    onChange={handleChange}
                />
            </>
            <>
                <label for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={user.password}
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

export default Signup
