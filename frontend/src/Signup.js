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
            <div class="shadow-md rounded-xl bg-blue-50 text-red-700 text-2xl p-6 m-6">
                <>
                    <h1 class=" rounded-xl bg-white text-gray-600 text-2xl p-6 m-6">
                        Set your username/password
                    </h1>
                    <label
                        for="username"
                        class=" text-red-700 text-2xl p-6 m-6"
                    >
                        Username
                    </label>
                    <input
                        name="username"
                        id="username"
                        className="form-control"
                        value={user.username}
                        onChange={handleChange}
                        class="border p-2 m-6"
                    />
                </>
                <>
                    <label
                        for="password"
                        class=" text-red-700 text-2xl p-6 m-6"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={user.password}
                        onChange={handleChange}
                        class="border p-2 m-6"
                    />
                </>
                {saveConfirmed ? goHome() : null}
                <button
                    type="submit"
                    className="btn btn-primary float-right"
                    onSubmit={handleSubmit}
                    class="shadow-md rounded text-2xl text-white bg-green-500 p-2 "
                >
                    Submit
                </button>
            </div>
        </form>
    )
}

export default Signup
