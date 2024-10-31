import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import '../assets/sass/main.scss'
import { SoccerHomePage } from './pages/soccer/SoccerHomePage'
import { SoccerPastIndex } from './pages/soccer/SoccerPastIndex'
import { SoccerFutureIndex } from './pages/soccer/SoccerFutureIndex'
import { SoccerPastMatchDetails } from './pages/soccer/SoccerPastMatchDetails'
import { AppHeader } from './cmps/AppHeader'

export function App() {

  return (
    <div>
      <AppHeader />
      <section>
        <Routes>
          <Route path="/" element={<SoccerHomePage />} />
          <Route path='/past-match' element={<SoccerPastIndex />} />
          <Route path="/match-details/:matchId" element={<SoccerPastMatchDetails />} />
          <Route path='/future-match' element={<SoccerFutureIndex />} />
        </Routes>
      </section>
    </div>
  )
}
