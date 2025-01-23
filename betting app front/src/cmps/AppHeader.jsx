import { useRef } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import { Link } from 'react-router-dom'
import Logo from "../../assets/img/Logo.svg"

export function AppHeader({ onToggleSidebar, isSidebarOpen }) {

	return (
		<header className="app-header">
			<Link to={'/'} className="link"><img src={Logo} alt="Betting App Logo" className="logo" /></Link>
			<button className={`nav-btn ${isSidebarOpen ? "active" : ""}`} onClick={onToggleSidebar}>
				{isSidebarOpen ? <FaTimes /> : <FaBars />}
			</button>
		</header>
	);
}
