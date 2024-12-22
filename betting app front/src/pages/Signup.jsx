import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTimes } from "react-icons/fa"

import user_icon from '../../assets/img/person.png'
import email_icon from '../../assets/img/email.png'
import password_icon from '../../assets/img/password.png'
import show_icon from '../../assets/img/show.png'
import hide_icon from '../../assets/img/hide.png'

export function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate('/')
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevState) => !prevState)
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
                    <input type="text" placeholder='Full Name' />
                </div>
                <div className="input">
                    <img src={email_icon} alt="email" />
                    <input type="email" placeholder='Email' />
                </div>
                <div className="input">
                    <img src={password_icon} alt="password" />
                    <input type={showPassword ? 'text' : 'password'} placeholder='Password' />
                    <img
                        src={showPassword ? hide_icon : show_icon}
                        alt="toggle visibility"
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                    />
                </div>
                <div className="input">
                    <img src={password_icon} alt="confirm password" />
                    <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' />
                    <img
                        src={showConfirmPassword ? hide_icon : show_icon}
                        alt="toggle visibility"
                        className="toggle-password"
                        onClick={toggleConfirmPasswordVisibility}
                    />
                </div>
            </div>
            <div className="submit-container">
                <div className="submit">Sign Up</div>
            </div>
            <div className="navigate">Have an acount? <Link to={'/login'} className='cta-link'> Click Here to Login!</Link></div>
        </div>
    )
}