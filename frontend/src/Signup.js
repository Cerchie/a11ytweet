import * as React from 'react'
import { useState } from 'react'

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
            alert('signup not successful')
        }
        setUser(INITIAL_STATE)
        setSaveConfirmed(true)
    }

    return (
        <form onSubmit={handleSubmit}>
            <>
                <h1>Set your username/password</h1>
                <label for="username" class="text-red-600 text-2xl">
                    Username
                </label>
                <input
                    name="username"
                    id="username"
                    className="form-control"
                    value={user.username}
                    onChange={handleChange}
                    class="border"
                />
            </>
            <>
                <label for="password" class="text-red-600 text-2xl">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={user.password}
                    onChange={handleChange}
                    class="border"
                />
            </>
            {saveConfirmed ? goHome() : null}
            <button
                type="submit"
                className="btn btn-primary float-right"
                onSubmit={handleSubmit}
                class="text-red-600 text-2xl"
            >
                Submit
            </button>
        </form>
    )
}

export default Signup
