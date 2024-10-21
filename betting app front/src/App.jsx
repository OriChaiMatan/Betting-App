import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import '../assets/sass/main.scss'
import { SoccerIndex } from './pages/soccer/SoccerIndex'
import { SoccerPastMatchDetails } from './pages/soccer/SoccerPastMatchDetails'
import {AppHeader} from './cmps/AppHeader'

export function App() {

  return (
    <div>
      <AppHeader />
      <section>
        <Routes>
          <Route path="/" element={<SoccerIndex />} />
          <Route path="/match-details/:matchId" element={<SoccerPastMatchDetails />} />
        </Routes>
      </section>
    </div>
  )
}
