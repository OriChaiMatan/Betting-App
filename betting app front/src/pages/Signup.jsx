import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signup } from '../store/actions/user.action'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { FaTimes } from "react-icons/fa"
import user_icon from '../../assets/img/person.png'
import email_icon from '../../assets/img/email.png'
import password_icon from '../../assets/img/password.png'
import show_icon from '../../assets/img/show.png'
import hide_icon from '../../assets/img/hide.png'

export function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [allowNotifications, setAllowNotifications] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleBackClick = () => {
        navigate('/')
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevState) => !prevState)
    }

    async function handleSubmit() {
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return;
        }

        const createAt = new Date().toISOString();
        const userData = {
            fullname: fullName,
            email,
            password,
            createAt,
            allowNotifications,
        };

        try {
            setError(null)
            const user = await signup(userData)
            if (user) {
                navigate('/') // Navigate only if user is successfully returned
            }
        } catch (err) {
            console.error('Signup failed:', err);
            setError('Signup failed, please try again.')
        }
    }

    return (
        <div className='container'>
            <div className="back-btn" onClick={handleBackClick}><FaTimes /></div>
            <div className='header'>
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={user_icon} alt="user" />
                    <input
                        type="text"
                        placeholder='Full Name'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="input">
                    <img src={email_icon} alt="email" />
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={`input ${error ? 'error' : ''}`}>
                    <img src={password_icon} alt="password" />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <img
                        src={showPassword ? hide_icon : show_icon}
                        alt="toggle visibility"
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                    />
                </div>
                <div className={`input ${error ? 'error' : ''}`}>
                    <img src={password_icon} alt="confirm password" />
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                    <img
                        src={showConfirmPassword ? hide_icon : show_icon}
                        alt="toggle visibility"
                        className="toggle-password"
                        onClick={toggleConfirmPasswordVisibility}
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="notifications">
                    <div className="allow-notification">
                        <input
                            type="checkbox"
                            checked={allowNotifications}
                            onChange={(e) => setAllowNotifications(e.target.checked)} />
                        Allow notifications to stay updated with the latest news and updates!
                    </div>
                </div>
            </div>
            <div className="submit-container">
                <div className="submit" onClick={handleSubmit}>Sign Up</div>
            </div>
            <div className="navigate">Have an acount? <Link to={'/login'} className='cta-link'> Click Here to Login!</Link></div>
        </div>
    )
}