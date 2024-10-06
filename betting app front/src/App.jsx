import { useState, useEffect } from 'react'
import { leaguesService } from './services/leagues.service'

function App() {

  const [leagues, setLeagues] = useState([])
  const [league, setLeague] = useState(null)
  const LEAGUE_ID = '149' 

  useEffect(() => {
    loadLeagues()
    // loadLeague()
}, [])

async function loadLeagues() {
  try {
      const leagues = await leaguesService.query()
      setLeagues(leagues)
  } catch (err) {
      console.log('Error in load', err)
  }
}

async function loadLeague() {
  try {
      const league = await leaguesService.getLeagueById(LEAGUE_ID)
      setLeague(league)
  } catch (err) {
      console.log('Error in load', err)
  }
}

if (!leagues) return <div>No leagues available</div>
  return (
    <div>
      <h1>Betting App</h1>
      <h2>Leagues:</h2>
      <pre>{JSON.stringify(leagues, null, 2)}</pre>

      <h2>League By Id:</h2>
      {/* <pre>{JSON.stringify(league, null, 2)}</pre> */}
    </div>
  )
}

export default App
