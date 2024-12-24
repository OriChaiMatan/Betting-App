import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/user.action'
import { userService } from '../services/user.service'
import { FaHome } from "react-icons/fa"
import { HiCubeTransparent } from "react-icons/hi"
import { CgSmartphoneChip } from "react-icons/cg"
import { PiSoccerBallFill } from "react-icons/pi"
import { GiSoccerField } from "react-icons/gi"
import { FaHistory } from "react-icons/fa"



export function SideBar({ onToggleSidebar }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        logout() // Dispatch logout action if using Redux
        navigate('/')  // Redirect to login page after logging out
    }

    const isLoggedIn = userService.getLoggedinUser() !== null

    return (
        <div className='side-bar'>
            <div className="first-routes">
                <NavLink to={'/'} className={({ isActive }) => isActive ? 'link-info active-link' : 'link-info'} onClick={onToggleSidebar}>
                    <FaHome className='icon' />
                    <span>Home</span>
                </NavLink>
                <NavLink to={'/bet'} className={({ isActive }) => isActive ? 'link-info active-link' : 'link-info'} onClick={onToggleSidebar}>
                    <HiCubeTransparent className='icon' />
                    <span>Betting</span>
                </NavLink>
                <NavLink to={'/ai-assistant'} className={({ isActive }) => isActive ? 'link-info active-link' : 'link-info'} onClick={onToggleSidebar} >
                    <CgSmartphoneChip className='icon' />
                    <span>AI Recommendations</span>
                </NavLink>
            </div>
            <div className="second-routes">
                <h1>Soccer</h1>
                <div className="links">
                    <NavLink to={'/leagues'} className={({ isActive }) => isActive ? 'link-info active-link' : 'link-info'} onClick={onToggleSidebar}>
                        <PiSoccerBallFill className='icon' />
                        <span>Leagues</span>
                    </NavLink>
                    <NavLink to={'/future-match'} className={({ isActive }) => isActive ? 'link-info active-link' : 'link-info'} onClick={onToggleSidebar}>
                        <GiSoccerField className='icon' />
                        <span>Future Matches</span>
                    </NavLink>
                    <NavLink to={'/past-match'} className={({ isActive }) => isActive ? 'link-info active-link' : 'link-info'} onClick={onToggleSidebar}>
                        <FaHistory className='icon' />
                        <span>Previous Matches</span>
                    </NavLink>
                </div>
            </div>
            <div className="login-signup">
            {isLoggedIn ? (
                    <span className='login-signup-btn' onClick={handleLogout}>Log out</span> 
                ) : (
                    <NavLink to={'/login'} className='login-signup-btn' onClick={onToggleSidebar}>
                        <span>Login</span>
                    </NavLink>
                )}
            </div>
        </div>
    )
}