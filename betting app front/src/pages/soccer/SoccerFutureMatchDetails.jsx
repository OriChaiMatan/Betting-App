import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { gamesService } from "../../services/games.service"
import { leaguesService } from "../../services/leagues.service"
import { RxCross1 } from "react-icons/rx"
import axios from "axios"

export function SoccerFutureMatchDetails() {
    const [match, setMatch] = useState(null)
    const [homeTeam, setHomeTeam] = useState(null)
    const [awayTeam, setAwayTeam] = useState(null)
    const [odds, setOdds] = useState(null)
    const params = useParams()

    const API_KEY = import.meta.env.VITE_API_KEY
    const BASE_URL = import.meta.env.VITE_BASE_URL

    useEffect(() => {
        loadMatch()
    }, [params.matchId])

    useEffect(() => {
        if (!match) return

        async function loadTeams() {
            try {
                const league = await leaguesService.getLeagueById(match.league_id)
                if (!league || !league.league_teams) {
                    console.error('League data or league teams missing')
                    return
                }
                const homeTeam = league.league_teams.find(team => team.team_key === match.match_hometeam_id)
                const awayTeam = league.league_teams.find(team => team.team_key === match.match_awayteam_id)
                setHomeTeam(homeTeam)
                setAwayTeam(awayTeam)
            } catch (err) {
                console.error('Error fetching teams:', err)
            }
        }

        loadTeams()
    }, [match])

    useEffect(() => {
        async function fetchOdds() {
            if (!match) return  // Ensure match is loaded
            try {
                const response = await axios.get(`${BASE_URL}`, {
                    params: {
                        action: 'get_odds',
                        match_id: match.match_id,
                        APIkey: API_KEY
                    }
                })
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const oddsData = response.data[0]
                    setOdds({
                        odd_1: oddsData.odd_1 || 'N/A',
                        odd_x: oddsData.odd_x || 'N/A',
                        odd_2: oddsData.odd_2 || 'N/A',
                    })
                } else {
                    setOdds({ odd_1: 'N/A', odd_x: 'N/A', odd_2: 'N/A' })
                }
            } catch (error) {
                console.error('Error fetching odds:', error)
                setOdds({ odd_1: 'N/A', odd_x: 'N/A', odd_2: 'N/A' })
            }
        }
        if (match) fetchOdds()
    }, [match])


    async function loadMatch() {
        try {
            const match = await gamesService.getFutureMatchById(params.matchId)
            setMatch(match)
        } catch (err) {
            console.log('Error in load future match', err)
        }
    }

    if (!match || !homeTeam || !awayTeam) return <div>Loading Match Details page...</div>
    return (
        <section className="future-match-details">
            <div className='league-data'>
                <img src={match.league_logo} alt="League Logo" />
                <div className="league-info">
                    <h3 className='heading-tertiary'>{match.league_name}</h3>
                    <span>Season: {match.league_year}</span>
                </div>
            </div>
            <div className="teams-data">
                <div className='team-preview'>
                    <img src={match.team_home_badge} alt="Home team badge" />
                    <span>Home Team</span>
                    <h3 className='heading-tertiary'>{match.match_hometeam_name}</h3>
                </div>
                <div className='odds-1x2'>
                    <span>1 <a>{odds ? odds.odd_1 : 'Loading...'}</a></span>
                    <span><RxCross1 /> <a>{odds ? odds.odd_x : 'Loading...'}</a></span>
                    <span>2 <a>{odds ? odds.odd_2 : 'Loading...'}</a></span>
                </div>
                <div className='team-preview'>
                    <img src={match.team_away_badge} alt="Home team badge" />
                    <span>Away Team</span>
                    <h3 className='heading-tertiary'>{match.match_awayteam_name}</h3>
                </div>
            </div>
                <>
                    <h1>Home Team: {homeTeam.team_name}</h1>
                    <h1>Away Team: {awayTeam.team_name}</h1>
                </>
        </section>
    )
}
