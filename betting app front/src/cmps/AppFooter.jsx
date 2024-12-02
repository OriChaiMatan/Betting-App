import React from 'react'
import { Link } from 'react-router-dom'

export function AppFooter() {
  return (
    <footer className='app-footer'>
      <div className="logo">
        <h3>BETTING APP</h3>
        <span>© Copyright 2024</span>
      </div>
      <div className="links">
        <div className="info">
          <h3>Sports</h3>
          <Link to={'/'}><span>Soccer</span></Link>
          <Link to={'/leagues'}><span>Leagues</span></Link>
          <Link to={'/bet'}><span>Betting</span></Link>
          <Link to={'/ai-assistant'}><span>AI</span></Link>
        </div>
        <div className="info">
          <h3>Security and Privacy</h3>
          <span>Privacy Policy</span>
          <span>Terms and Conditions</span>
          <span>Cookie Policy</span>
          <a href="https://www.gambleaware.org/" target="_blank" rel="noopener noreferrer"><span>BeGambleAware.org</span></a>
        </div>
        <div className="be-gamble-aware">
          <a
            href="https://www.gambleaware.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="assets/img/BwGambleAware.png"
              alt="GambleAware.org"
              className='be-gamble-aware-logo'
            />
          </a>
        </div>
      </div>
    </footer>
  )
}