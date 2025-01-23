import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../../assets/img/Logo.svg"

export function AppFooter() {
  return (
    <footer className='app-footer'>
      <div className="logo">
        <img src={Logo} alt="Betting App Logo" className="logo" />
        <span>© Copyright 2024</span>
      </div>
      <div className="links">
        <div className="info">
          <h3>Sports</h3>
          <Link to={'/'} className='link'><span>Soccer</span></Link>
          <Link to={'/leagues'} className='link'><span>Leagues</span></Link>
          <Link to={'/bet'} className='link'><span>Betting</span></Link>
          <Link to={'/ai-assistant'} className='link'><span>AI</span></Link>
        </div>
        <div className="info">
          <h3>Security and Privacy</h3>
          <Link to={'/privacy-policy'} className='link'><span>Privacy Policy</span></Link>
          <Link to={'/terms-and-conditions'} className='link'><span>Terms and Conditions</span></Link>
          <Link to={'/affiliate-disclosure'} className='link'><span>Affiliate Disclosure</span></Link>
          <a className='link' href="https://www.gambleaware.org/" target="_blank" rel="noopener noreferrer"><span>BeGambleAware.org</span></a>
        </div>
        <div className="be-gamble-aware">
          <a
            href="https://www.gambleaware.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="../../../assets/img/BeGambleAware.png"
              alt="GambleAware.org"
              className='be-gamble-aware-logo'
            />
          </a>
        </div>
      </div>
    </footer>
  )
}