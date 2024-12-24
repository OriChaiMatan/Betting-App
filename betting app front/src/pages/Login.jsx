import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTimes } from "react-icons/fa"
import { useDispatch } from 'react-redux'
import { login } from '../store/actions/user.action'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import email_icon from '../../assets/img/email.png'
import password_icon from '../../assets/img/password.png'
import show_icon from '../../assets/img/show.png'
import hide_icon from '../../assets/img/hide.png'

export function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleBackClick = () => {
        navigate('/')
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState)
    }

    const handleSubmit = async () => {
        const userData = {
            email,
            password
        }

        try {
            // Dispatch the login action
            const user = await login(userData)
            navigate('/')
        } catch (err) {
            console.error('Login failed:', err)
            showErrorMsg('Login failed. Please check your credentials and try again.')
        }
    }

    return (
        <div className='container'>
            <div className="back-btn" onClick={handleBackClick}><FaTimes /></div>
            <div className='header'>
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={email_icon} alt="email" />
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input">
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
            </div>
            <div className="forgot-password">Forgot your password? <span>Click Here !</span></div>
            <div className="submit-container">
                <div className="submit" onClick={handleSubmit}>Login</div>
            </div>
            <div className="navigate">Dont have an acount? <Link to={'/signup'} className='cta-link'> Click Here to Sign Up!</Link></div>
        </div>
    )
}