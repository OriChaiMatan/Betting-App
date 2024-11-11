import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { gamesService } from "../../services/games.service"
import { leaguesService } from "../../services/leagues.service"
import { utilService } from "../../services/util.service"
import { Last5Matches } from "../../cmps/soccer/future-match/Last5Matches"
import { MdOutlinePlace } from "react-icons/md"

export function SoccerFutureMatchDetails() {
    const [match, setMatch] = useState(null)
    const [homeTeam, setHomeTeam] = useState(null)
    const [awayTeam, setAwayTeam] = useState(null)
    const [odds, setOdds] = useState(null)
    const [homeLast5Games, setHomeLast5Games] = useState([])
    const [awayLast5Games, setAwayLast5Games] = useState([])
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
                if (homeTeam) loadLast5Matches(homeTeam.team_key, setHomeLast5Games)
                if (awayTeam) loadLast5Matches(awayTeam.team_key, setAwayLast5Games)
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
                    const oddsData = response.data
                    const averageOdds = calculateAverageOdds(oddsData)
                    setOdds(averageOdds)
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

    const calculateAverageOdds = (oddsList) => {
        if (!oddsList || oddsList.length === 0) return { odd_1: 'N/A', odd_x: 'N/A', odd_2: 'N/A' }

        let totalHome = 0, totalDraw = 0, totalAway = 0
        let count = oddsList.length

        oddsList.forEach(odds => {
            totalHome += parseFloat(odds.odd_1)
            totalDraw += parseFloat(odds.odd_x)
            totalAway += parseFloat(odds.odd_2)
        })

        return {
            odd_1: (totalHome / count).toFixed(2),
            odd_x: (totalDraw / count).toFixed(2),
            odd_2: (totalAway / count).toFixed(2),
        }
    }

    async function loadLast5Matches(teamId, setTeamLast5Games) {
        try {
            const last5Games = await gamesService.getPastGames();
            const filteredGames = last5Games
                .filter(game => game.match_hometeam_id === teamId || game.match_awayteam_id === teamId)
                .slice(0, 5); // Get only the last 5 games
            setTeamLast5Games(filteredGames);
        } catch (error) {
            console.error('Error fetching last 5 games:', error);
        }
    }

    const getReadableOutcome = (match, teamId) => {
        if (match.match_hometeam_id === teamId) {
            return match.match_hometeam_score > match.match_awayteam_score ? 'W' :
                match.match_hometeam_score < match.match_awayteam_score ? 'L' : 'D';
        } else {
            return match.match_awayteam_score > match.match_hometeam_score ? 'W' :
                match.match_awayteam_score < match.match_hometeam_score ? 'L' : 'D';
        }
    };


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
                {/* <div className='odds-1x2'>
                    <span>1 <a>{odds ? odds.odd_1 : 'Loading...'}</a></span>
                    <span><RxCross1 /> <a>{odds ? odds.odd_x : 'Loading...'}</a></span>
                    <span>2 <a>{odds ? odds.odd_2 : 'Loading...'}</a></span>
                </div> */}
                <div className='vs'>
                    <span>VS</span>
                </div>
                <div className='team-preview'>
                    <img src={match.team_away_badge} alt="Home team badge" />
                    <span>Away Team</span>
                    <h3 className='heading-tertiary'>{match.match_awayteam_name}</h3>
                </div>
            </div>
            <div className="place-data">
                <div className="date">
                    <h3 className='heading-tertiary'>{match.match_time}</h3>
                    <h3 className='heading-tertiary'>{utilService.formatDate(match.match_date)}</h3>
                </div>
                <div className="stadium">
                    <MdOutlinePlace />
                    <h3 className="heading-tertiary">{match.match_stadium}</h3>
                </div>
            </div>
            <Last5Matches
                homeLast5Games={homeLast5Games}
                awayLast5Games={awayLast5Games}
                homeTeam={homeTeam}
                awayTeam={awayTeam}
                getReadableOutcome={getReadableOutcome}
            />
        </section>
    )
}
