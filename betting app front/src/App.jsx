import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import '../assets/sass/main.scss'
import { SoccerHomePage } from './pages/soccer/SoccerHomePage'
import { SoccerPastIndex } from './pages/soccer/SoccerPastIndex'
import { SoccerFutureIndex } from './pages/soccer/SoccerFutureIndex'
import { SoccerPastMatchDetails } from './pages/soccer/SoccerPastMatchDetails'
import { SoccerFutureMatchDetails } from './pages/soccer/SoccerFutureMatchDetails'
import { AppHeader } from './cmps/AppHeader'
import { SideBar } from './cmps/SideBar'
import { AppFooter } from './cmps/AppFooter'

export function App() {

  return (
    <div>
      <AppHeader />
      <section className='main-content'>
        {/* <SideBar /> */}
        <Routes>
          <Route path="/" element={<SoccerHomePage />} />
          <Route path='/past-match' element={<SoccerPastIndex />} />
          <Route path="/past-match-details/:matchId" element={<SoccerPastMatchDetails />} />
          <Route path='/future-match' element={<SoccerFutureIndex />} />
          <Route path="/future-match-details/:matchId" element={<SoccerFutureMatchDetails />} />
        </Routes>
      </section>
      <AppFooter />
    </div>
  )
}
