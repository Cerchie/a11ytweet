import * as React from 'react'
import { useState } from 'react'
import './styles/ProfileSignup.css'
import { useHistory } from 'react-router-dom'

const Signup = ({ signupUser }) => {
    //setting init state
    const INITIAL_STATE = {
        username: '',
        password: '',
    }

    //saving form data, errors in state
    const [user, setUser] = useState(INITIAL_STATE)
    const [formErrors, setFormErrors] = useState([])
    const [saveConfirmed, setSaveConfirmed] = useState(false)
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
    //on Submit we change the page
    function goHome() {
        let history = useHistory()
        history.push('/gohome')
    }

    //handles form submit
    async function handleSubmit(e) {
        e.preventDefault()
        let result = await signupUser({
            user,
        })
        if (result.success) {
            goHome()
        } else {
            setFormErrors(result.errors)
        }
        setUser(INITIAL_STATE)
        setSaveConfirmed(true)
    }

    return (
        <form onSubmit={handleSubmit}>
            <>
                <h1>Set your username/password</h1>
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
            {saveConfirmed ? goHome() : null}
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
