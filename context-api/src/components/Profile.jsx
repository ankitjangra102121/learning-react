import React, { useContext } from 'react'
import UserContext from '../context/UserContext'

function Profile() {
    const { user } = useContext(UserContext)
    
    if (!user) return <div className="text-center">Please login</div>

    return (
        <div className="bg-gray-100 p-4">
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            <p>Username: {user.username}</p>
            <p>Password: {user.password}</p>
        </div>
    )
}

export default Profile