import { useRef } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import { Link } from 'react-router-dom'

export function AppHeader() {
    const navRef = useRef()

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header className="app-header">
			<Link to={'/'} className="link"><h3 className="heading-tertiary">BETTING APP</h3></Link>
			<nav className="header-nav" ref={navRef}>
				<a href="/#">Home</a>
				<a href="/past-match">Past Games</a>
				<a href="/future-match">Future Games</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}
