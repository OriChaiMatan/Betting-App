import React from 'react'

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
          <span>Football</span>
          <span>Betting</span>
          <span>AI</span>
        </div>
        <div className="info">
          <h3>Security and Privacy</h3>
          <span>Privacy Policy</span>
          <span>Terms and Conditions</span>
          <span>Cookie Policy</span>
          <span>BeGambleAware.org</span>
        </div>
        <div className="be-gamble-aware">
          <a
            href="https://www.gambleaware.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="assets/img/BeGambleAware.png"
              alt="GambleAware.org"
              className='be-gamble-aware-logo'
            />
          </a>
        </div>
      </div>
    </footer>
  )
}