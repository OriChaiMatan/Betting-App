import { Route, HashRouter as Router, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../assets/sass/main.scss'
import { SkeletonTheme } from 'react-loading-skeleton'
import { SoccerHomePage } from './pages/soccer/SoccerHomePage'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { SoccerPastIndex } from './pages/soccer/SoccerPastIndex'
import { SoccerFutureIndex } from './pages/soccer/SoccerFutureIndex'
import { SoccerPastMatchDetails } from './pages/soccer/SoccerPastMatchDetails'
import { SoccerFutureMatchDetails } from './pages/soccer/SoccerFutureMatchDetails'
import { SoccerLeaguesIndex } from './pages/soccer/SoccerLeaguesIndex'
import { SoccerLeagueDetails } from './pages/soccer/SoccerLeagueDetails'
import { SoccerTeamDetails } from './pages/soccer/SoccerTeamDetails'
import { BettingIndex } from './pages/BettingIndex'
import { AiAssistant } from './pages/AiAssistant'
import { AppHeader } from './cmps/AppHeader'
import { SideBar } from './cmps/SideBar'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg'
import { UserDetails } from './pages/UserDetails'
import { Privacy } from './pages/Privacy'
import { TermsAndPolicies } from './pages/TermsAndPolicies'
import { AffiliateDisclosure } from './pages/AffiliateDisclosure'

export function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  const handleResize = () => {
    if (window.innerWidth > 1024) {
      setIsSidebarOpen(true) // Always open on large screens
    }
  }

  useEffect(() => {
    handleResize() // Initialize the sidebar visibility
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const toggleSidebar = () => {
    if (window.innerWidth <= 1024) {
      setIsSidebarOpen((prev) => !prev) // Toggle only on small screens
    }
  }

  return (
    <div>
      <SkeletonTheme baseColor="#080f25" highlightColor="#212c4d">
        <AppHeader onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
        <section className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {isSidebarOpen && <SideBar onToggleSidebar={toggleSidebar} />}
          <div className="main-routes">
            <Routes>
              <Route path="/" element={<SoccerHomePage />} />
              <Route path='/user/:userId' element={<UserDetails />} />
              <Route path='/past-match' element={<SoccerPastIndex />} />
              <Route path="/past-match-details/:matchId" element={<SoccerPastMatchDetails />} />
              <Route path='/future-match' element={<SoccerFutureIndex />} />
              <Route path="/future-match-details/:matchId" element={<SoccerFutureMatchDetails />} />
              <Route path="/leagues" element={<SoccerLeaguesIndex />} />
              <Route path="/league-details/:leagueId" element={<SoccerLeagueDetails />} />
              <Route path="/team-details/:leagueId/:teamId" element={<SoccerTeamDetails />} />
              <Route path="/bet" element={<BettingIndex />} />
              <Route path="/ai-assistant" element={<AiAssistant />} />
              <Route path="/privacy-policy" element={<Privacy />} />
              <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
              <Route path="/terms-and-conditions" element={<TermsAndPolicies />} />
            </Routes>

            {/* Modal Logic */}
            {location.pathname === '/login' && (
              <div className="modal">
                <Login />
              </div>
            )}
            {location.pathname === '/signup' && (
              <div className="modal">
                <Signup />
              </div>
            )}
          </div>
        </section>
        <AppFooter />
        <UserMsg />
      </SkeletonTheme>
    </div>
  )
}
