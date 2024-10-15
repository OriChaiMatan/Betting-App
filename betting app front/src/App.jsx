import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { SoccerIndex } from './pages/soccer/SoccerIndex'
import {AppHeader} from './cmps/AppHeader'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import './assets/styles/main.scss'

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
