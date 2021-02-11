import * as React from 'react'
import { useState, useContext } from 'react'
import UserContext from './UserContext'
import { useHistory } from 'react-router-dom'

function Profile({ saveProfile }) {
    if (useContext(UserContext) !== undefined) {
        const { currentUser } = useContext(UserContext)

        const [formData, setFormData] = useState({
            username: currentUser.username,
            password: '',
        })
        const [formErrors, setFormErrors] = useState([])
        const [saveConfirmed, setSaveConfirmed] = useState(false)

        console.debug(
            'ProfileForm',
            'currentUser=',
            currentUser,
            'formData=',
            formData,
            'formErrors=',
            formErrors,
            'saveConfirmed=',
            saveConfirmed
        )
        function goHome() {
            let history = useHistory()
            history.push('/gohome')
        }
        async function handleSubmit(evt) {
            evt.preventDefault()

            let profileData = {
                password: formData.password,
            }
            let username = formData.username
            let updatedUser

            try {
                updatedUser = await saveProfile(username, profileData)
            } catch (errors) {
                setFormErrors(errors)
                return
            }
            setFormData((f) => ({ ...f, password: '' }))
            setFormErrors([])
            setSaveConfirmed(true)
        }

        function handleChange(evt) {
            const { name, value } = evt.target
            setFormData((f) => ({
                ...f,
                [name]: value,
            }))
            setFormErrors([])
        }
        //maybe add a 'if Curruser...''
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
    return <div> No Profile </div>
}

export default Profile
