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
                <div className="shadow-md rounded-xl bg-blue-50 text-red-700 text-2xl p-6 m-6">
                    <>
                        <label
                            htmlFor="username"
                            className=" rounded-xl bg-white text-gray-600 text-2xl p-6 m-6"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            className="form-control"
                            value={formData.username}
                            onChange={handleChange}
                            className="border p-2 m-6"
                        />
                    </>
                    <>
                        <label
                            htmlFor="password"
                            className=" text-red-700 text-2xl p-6 m-6"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            className="border p-2 m-6"
                        />
                    </>
                    {saveConfirmed ? goHome() : null}
                    <button
                        type="submit"
                        className="btn btn-primary float-right"
                        onSubmit={handleSubmit}
                        className=" text-red-600 text-2xl"
                    >
                        Submit
                    </button>
                </div>
            </form>
        )
    }
    return <> No Profile </>
}

export default Profile
