import { useState, useEffect } from 'react'
import { leaguesService } from './services/leagues.service'
import { gamesService } from './services/games.service'

function App() {

  const [leagues, setLeagues] = useState([])
  const [league, setLeague] = useState(null)
  const [pastGames, setPastGames] = useState([])
  const [todayGames, setTodayGames] = useState([])
  const [tomorrowGames, setTomorrowGames] = useState([])
  const [nextTwoDayGames, setNextTwoDayGames] = useState([])
  const LEAGUE_ID = '149'

  useEffect(() => {
    loadLeagues()
    // loadLeague()
    loadPastGames()
    loadTodayGames()
    loadTomorrowGames()
    loadNextTwoDayGames()
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

  async function loadPastGames() {
    try {
      const pastGamesData = await gamesService.getPastGames() // Fetch past games
      setPastGames(pastGamesData)
    } catch (err) {
      console.log('Error in loading past games', err)
    }
  }

  async function loadTodayGames() {
    try {
      const games = await gamesService.getTodayGames();
      setTodayGames(games);
    } catch (err) {
      console.log('Error in loading today games', err);
    }
  }

  async function loadTomorrowGames() {
    try {
      const games = await gamesService.getTomorrowGames();
      setTomorrowGames(games);
    } catch (err) {
      console.log('Error in loading tomorrow games', err);
    }
  }

  async function loadNextTwoDayGames() {
    try {
      const games = await gamesService.getNextTwoDayGames();
      setNextTwoDayGames(games);
    } catch (err) {
      console.log('Error in loading next three day games', err);
    }
  }

  if (!leagues && !pastGames && !todayGames && !tomorrowGames && !nextTwoDayGames) return <div>No leagues/games available</div>
  return (
    <div>
      <h1>Betting App</h1>
      {/* <h2>Leagues:</h2>
      <pre>{JSON.stringify(leagues, null, 2)}</pre> */}

      {/* <h2>Past Games:</h2>
      <pre>{JSON.stringify(pastGames, null, 2)}</pre> Display past games */}

      <h2>Today's Games (07/10/2024):</h2>
      <pre>{JSON.stringify(todayGames, null, 2)}</pre>

      <h2>Tomorrow's Games (08/10/2024):</h2>
      <pre>{JSON.stringify(tomorrowGames, null, 2)}</pre>

      <h2>Next Three Days' Games (09/10/2024):</h2>
      <pre>{JSON.stringify(nextTwoDayGames, null, 2)}</pre>
    </div>
  )
}

export default App
