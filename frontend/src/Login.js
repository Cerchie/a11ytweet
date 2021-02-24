import * as React from 'react'
import { useState, useHistory } from 'react'
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
    //"State updates from the useState() and useReducer()
    //Hooks don't support the " + 'second callback argument.
    //To execute a side effect after ' + 'rendering,
    //declare it in the component body with useEffect().');
    async function handleSubmit(e) {
        e.preventDefault()
        let result = await login(formData)
        console.log(result)
        if (result.success) {
            goHome()
            alert('logged in')
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
            <div class="shadow-md rounded-xl bg-blue-50 text-red-600 text-2xl p-6 m-6">
                <>
                    <h1 class=" rounded-xl bg-white text-red-600 text-2xl p-6 m-6">
                        Login Below
                    </h1>

                    <label
                        for="username"
                        class=" text-red-600 text-2xl p-6 m-6"
                    >
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        class="border p-2 m-6"
                    />
                </>
                <>
                    <label
                        for="password"
                        class=" text-red-600 text-2xl p-6 m-6"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        class="border p-2 m-6"
                    />
                </>

                <button
                    type="submit"
                    onSubmit={handleSubmit}
                    class="shadow-md rounded text-2xl text-white bg-green-500 p-2 "
                >
                    Submit
                </button>
            </div>
        </form>
    )
}
//code adapted from my project https://github.com/Cerchie/react-jobly/blob/main/frontend/src/Login.js
export default Login
