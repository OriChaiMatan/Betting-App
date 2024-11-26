import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from "react-icons/fa"
import { HiCubeTransparent } from "react-icons/hi"
import { CgSmartphoneChip } from "react-icons/cg"
import { PiSoccerBallFill } from "react-icons/pi"
import { GiSoccerField } from "react-icons/gi"
import { FaHistory } from "react-icons/fa"



export function SideBar() {
    return (
        <div className='side-bar'>
            <div className="first-routes">
                <Link to={'/'} className='link-info' >
                    <FaHome className='icon' />
                    <span>Home</span>
                </Link>
                <Link to={'/bet'} className='link-info' >
                    <HiCubeTransparent className='icon' />
                    <span>Betting</span>
                </Link>
                <Link to={'/ai-assistant'} className='link-info' >
                    <CgSmartphoneChip className='icon' />
                    <span>AI Recommendations</span>
                </Link>
            </div>
            <div className="second-routes">
                <h1>Soccer</h1>
                <div className="links">
                    <Link to={'/leagues'} className='link-info' >
                        <PiSoccerBallFill className='icon' />
                        <span>Leagues</span>
                    </Link>
                    <Link to={'/future-match'} className='link-info' >
                        <GiSoccerField className='icon' />
                        <span>Future Matches</span>
                    </Link>
                    <Link to={'/past-match'} className='link-info' >
                        <FaHistory className='icon' />
                        <span>Previous Matches</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}