import React, { useState, useEffect } from 'react'
import { userService } from '../services/user.service'

export function UserDetails() {
    const [user, setUser] = useState(null)
    const [isEditingNotifications, setIsEditingNotifications] = useState(false)

    useEffect(() => {
        loadUser()
    }, [])

    async function loadUser() {
        try {
            const loggedInUser = userService.getLoggedinUser()
            const data = await userService.getById(loggedInUser._id)
            setUser(data)
            console.log(data)
        } catch (err) {
            showErrorMsg('Error in fetch User data, Please try again')
            navigate(-1)
        }
    }

    async function toggleNotifications() {
        if (!user) return;

        const updatedUser = {
            ...user,
            allowNotifications: !user.allowNotifications,
        };

        try {
            await userService.update(updatedUser);
            setUser(updatedUser);
            showSuccessMsg(`Notifications ${updatedUser.allowNotifications ? 'enabled' : 'disabled'}`)
        } catch (err) {
            showErrorMsg('Failed to update notifications, please try again');
        }
    }

    if (!user) return <div>Loading...</div>

    return (
        <div className="user-details">
            <div className="user-header">
                <h1>{user.fullname}</h1>
            </div>
            <section className="account-info">
                <h2>Account Information:</h2>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Signup Date:</strong>{' '}
                    {new Date(user.createAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
                <p>
                <strong>Notifications:</strong>{' '}
                    <button
                        className="edit-notifications-btn"
                        onClick={toggleNotifications}
                    >
                        {user.allowNotifications ? 'Turn off' : 'Turn on'}
                    </button>
                </p>
            </section>
        </div>
    );
}
