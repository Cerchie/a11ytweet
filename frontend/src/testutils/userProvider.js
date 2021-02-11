import React from 'react'
import UserContext from '../UserContext'

const demoUser = {
    username: 'testuser',
}

const UserProvider = ({ children, currentUser = demoUser }) => (
    <UserContext.Provider value={{ currentUser }}>
        {children}
    </UserContext.Provider>
)

export { UserProvider }
