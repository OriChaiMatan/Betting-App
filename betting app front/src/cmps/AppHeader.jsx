import { useRef } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import { Link } from 'react-router-dom'

export function AppHeader({ onToggleSidebar, isSidebarOpen }) {

	return (
		<header className="app-header">
			<Link to={'/'} className="link"><h3 className="heading-tertiary">BETTING APP</h3></Link>
			<button className={`nav-btn ${isSidebarOpen ? "active" : ""}`} onClick={onToggleSidebar}>
				{isSidebarOpen ? <FaTimes /> : <FaBars />}
			</button>
		</header>
	);
}
