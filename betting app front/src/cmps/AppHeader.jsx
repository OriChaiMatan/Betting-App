import React from 'react';
import { Link } from 'react-router-dom';

export function AppHeader() {
    return (
        <header className='header-section2 header-section'>
            <nav className="navbar navbar-expand-lg position-relative py-md-3 py-lg-6 workready">
                <div className="collapse navbar-collapse justify-content-between" id="navbar-content">
                    <ul
                        className="navbar-nav2fixed  navbar-nav d-flex align-items-lg-center gap-4 gap-sm-5  py-2 py-lg-0 align-self-center p2-bg">
                        <li className="dropdown show-dropdown">
                            <Link to="/index">Home</Link>
                        </li>
                        <li className="dropdown show-dropdown">
                            <Link to="/sports">Sports</Link>
                        </li>
                        <li className="dropdown show-dropdown">
                            <Link to="/live">Live</Link>
                        </li>
                        <li className="dropdown show-dropdown d-block d-sm-none">
                            <div className="d-flex align-items-center flex-wrap gap-3">
                                <Link to="/login" className="cmn-btn second-alt px-xxl-11 rounded-2">Log In</Link>
                                <Link to="/create-account" className="cmn-btn px-xxl-11">Sign Up</Link>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="right-area custom-pos position-relative d-flex gap-0 gap-lg-7 align-items-center me-5 me-xl-10">
                <Link to="/login" className="cmn-btn second-alt px-xxl-11 rounded-2 me-5 me-lg-0 d-none d-sm-block">Log In</Link>
                <Link to="/create-account" className="cmn-btn d-none px-xxl-11 d-sm-block d-lg-none d-xl-block">Sign Up</Link>
                </div>
                <button className="navbar-toggler mt-1 mt-sm-2 mt-lg-0" type="button" data-bs-toggle="collapse" aria-label="Navbar Toggler"
                    data-bs-target="#navbar-content" aria-expanded="true" id="nav-icon3">
                    <span></span><span></span><span></span><span></span>
                </button>
            </nav>
        </header>
    );
}
