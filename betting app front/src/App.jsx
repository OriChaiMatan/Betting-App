import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import '../assets/sass/main.scss'
import { SoccerPastIndex } from './pages/soccer/SoccerPastIndex'
import {SoccerFutureIndex} from './pages/soccer/SoccerFutureIndex'
import { SoccerPastMatchDetails } from './pages/soccer/SoccerPastMatchDetails'
import {AppHeader} from './cmps/AppHeader'

export function App() {

  return (
    <div>
      <AppHeader />
      <section>
        <Routes>
          <Route path="/" element={<SoccerPastIndex />} />
          <Route path='/future-match' element={<SoccerFutureIndex />} />
          <Route path="/match-details/:matchId" element={<SoccerPastMatchDetails />} />
        </Routes>
      </section>
    </div>
  )
}
