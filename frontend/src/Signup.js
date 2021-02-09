import { React, useState } from 'react'

const Signup = ({ signupUser }) => {
    //setting init state
    const INITIAL_STATE = {
        username: '',
        password: '',
    }

    //saving form data, errors in state
    const [formData, setFormData] = useState(INITIAL_STATE)
    const [formErrors, setFormErrors] = useState([])
    //makes debugging easier
    console.debug(
        'SignupForm',
        'signup=',
        typeof signup,
        'formData=',
        formData,
        'formErrors=',
        formErrors
    )
    //handles changes in form
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((formData) => ({
            ...formData,
            [name]: value,
        }))
    }

    //handles form submit
    async function handleSubmit(e) {
        e.preventDefault()
        let result = await signupUser(formData)
        console.log(result)
        if (result.success) {
            alert('signed up!')
        } else {
            setFormErrors(result.errors)
        }
        setFormData(INITIAL_STATE)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Username</label>
                <input
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
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
