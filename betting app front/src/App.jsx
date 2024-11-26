import { Route, HashRouter as Router, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import '../assets/sass/main.scss'
import { SoccerHomePage } from './pages/soccer/SoccerHomePage'
import { SoccerPastIndex } from './pages/soccer/SoccerPastIndex'
import { SoccerFutureIndex } from './pages/soccer/SoccerFutureIndex'
import { SoccerPastMatchDetails } from './pages/soccer/SoccerPastMatchDetails'
import { SoccerFutureMatchDetails } from './pages/soccer/SoccerFutureMatchDetails'
import { SoccerLeaguesIndex } from './pages/soccer/SoccerLeaguesIndex'
import { BettingIndex } from './pages/BettingIndex'
import { AppHeader } from './cmps/AppHeader'
import { SideBar } from './cmps/SideBar'
import { AppFooter } from './cmps/AppFooter'

export function App() {

  const location = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <div>
      <AppHeader />
      <section className='main-content'>
        <SideBar />
        <div className="main-routes">
          <Routes>
            <Route path="/" element={<SoccerHomePage />} />
            <Route path='/past-match' element={<SoccerPastIndex />} />
            <Route path="/past-match-details/:matchId" element={<SoccerPastMatchDetails />} />
            <Route path='/future-match' element={<SoccerFutureIndex />} />
            <Route path="/future-match-details/:matchId" element={<SoccerFutureMatchDetails />} />
            <Route path="/leagues" element={<SoccerLeaguesIndex />} />
            <Route path="/bet" element={<BettingIndex />} />
            <Route path="/ai-assistant" element={<BettingIndex />} />
          </Routes>
        </div>
      </section>
      <AppFooter />
    </div>
  )
}
