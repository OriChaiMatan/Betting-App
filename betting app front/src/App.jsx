import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { SoccerIndex } from './pages/soccer/SoccerIndex'
import {AppHeader} from './cmps/AppHeader'
import '../assets/sass/main.scss'

export function App() {

  return (
    <div>
      <AppHeader />
      {/* <Router>
        <section>
          <Routes>
            <Route path='/' element={<SoccerIndex />} />
          </Routes>
        </section>
      </Router> */}
    </div>
  )
}
