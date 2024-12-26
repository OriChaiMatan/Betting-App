import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link, useNavigate } from "react-router-dom"
import { gamesService } from "../../services/games.service"
import { leaguesService } from "../../services/leagues.service"
import { utilService } from "../../services/util.service"
import { Last5Matches } from "../../cmps/soccer/future-match/Last5Matches"
import { ProbabilitiesBar } from "../../cmps/soccer/future-match/ProbabilitiesBar"
import { StatisticsTable } from "../../cmps/soccer/future-match/StatisticsTable"
import { CardsTable } from "../../cmps/soccer/future-match/CardsTable"
import { StickyHeader } from "../../cmps/soccer/StickyHeader"
import { TimeForGoalBar } from "../../cmps/soccer/future-match/TimeForGoalBar"
import { CallToActionHeader } from "../../cmps/soccer/future-match/CallToActionHeader"
import { SkeletonFutureMatchDetails } from "../../cmps/loaders/SkeletonFutureMatchDetails"
import { MdOutlinePlace } from "react-icons/md"
import { showErrorMsg } from "../../services/event-bus.service"
import { FaRegStar } from "react-icons/fa6"


export function SoccerFutureMatchDetails() {
    const [match, setMatch] = useState(null)
    const [homeTeam, setHomeTeam] = useState(null)
    const [awayTeam, setAwayTeam] = useState(null)
    const [odds, setOdds] = useState(null)
    const [homeLast5Games, setHomeLast5Games] = useState([])
    const [awayLast5Games, setAwayLast5Games] = useState([])
    const [isSticky, setIsSticky] = useState(false)
    const [view, setView] = useState('fullMatch')
    const params = useParams()
    const navigate = useNavigate()

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
                    showErrorMsg('Error in get League Teams, Please try again')
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
                showErrorMsg('Error in fetch Teams, Please try again')
                navigate("/future-match")
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

    const handleScroll = () => {
        const scrollPosition = window.scrollY
        const viewportHeight = window.innerHeight
        const threshold = viewportHeight * 0.2  // 20% of viewport height

        setIsSticky(scrollPosition > threshold)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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
            const last5Games = await gamesService.getPastGames()
            const filteredGames = last5Games
                .filter(game => game.match_hometeam_id === teamId || game.match_awayteam_id === teamId)
                .slice(0, 5); // Get only the last 5 games
            setTeamLast5Games(filteredGames)
        } catch (error) {
            console.error('Error fetching last 5 games:', error)
        }
    }

    const getReadableOutcome = (match, teamId) => {
        if (match.match_hometeam_id === teamId) {
            return match.match_hometeam_score > match.match_awayteam_score ? 'W' :
                match.match_hometeam_score < match.match_awayteam_score ? 'L' : 'D'
        } else {
            return match.match_awayteam_score > match.match_hometeam_score ? 'W' :
                match.match_awayteam_score < match.match_hometeam_score ? 'L' : 'D'
        }
    }

    const homeStats = homeTeam?.home_statistic?.avg_statistics || {}
    const awayStats = awayTeam?.away_statistic?.avg_statistics || {}
    const firstHalfHomeStats = homeTeam?.home_statistic?.avg_first_half_statistics || {}
    const firstHalfAwayStats = awayTeam?.away_statistic?.avg_first_half_statistics || {}

    const commonStats = Object.keys(homeStats).filter(commonStat => awayStats.hasOwnProperty(commonStat))

    const stats = commonStats.map(stat => ({
        label: stat,
        homeValue: homeStats[stat],
        awayValue: awayStats[stat]
    }))

    const firstHalfStats = commonStats.map(stat => ({
        label: stat,
        homeValue: firstHalfHomeStats[stat],
        awayValue: firstHalfAwayStats[stat]
    }))

    const currentStats = view === "fullMatch" ? stats : firstHalfStats

    const handleViewChange = (selectedView) => {
        setView(selectedView)
    }


    if (!match || !homeTeam || !awayTeam) return <SkeletonFutureMatchDetails />
    return (
        <>
            {isSticky && <StickyHeader match={match} />}
            <section className="future-match-details">
                <div className="call-to-action-header"><CallToActionHeader /></div>
                <Link to={`/league-details/${match.league_id}`} className="link">
                    <div className='league-data'>
                        <img src={match.league_logo} alt="League Logo" />
                        <div className="league-info">
                            <h1>{match.league_name}</h1>
                            <span>Season: {match.league_year}</span>
                        </div>
                    </div>
                </Link>
                <div className="teams-data">
                    <Link to={`/team-details/${match.league_id}/${match.match_hometeam_id}`} className="link">
                        <div className='team-preview'>
                            <img src={match.team_home_badge} alt="Home team badge" />
                            <span>Home Team</span>
                            <h3 className='heading-tertiary'>{match.match_hometeam_name}</h3>
                        </div>
                    </Link>
                    <div className='vs'>
                        <span>VS</span>
                    </div>
                    <Link to={`/team-details/${match.league_id}/${match.match_awayteam_id}`} className="link">
                        <div className='team-preview'>
                            <img src={match.team_away_badge} alt="Away team badge" />
                            <span>Away Team</span>
                            <h3 className='heading-tertiary'>{match.match_awayteam_name}</h3>
                        </div>
                    </Link>
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
                <div className="details">
                    <div className="add-to-favorite-match">
                        <FaRegStar className="favorite-icon" />
                        <span>Add match to your favorite list !</span> 
                    </div>
                    {odds && <ProbabilitiesBar odds={odds} />}
                    <Last5Matches
                        homeLast5Games={homeLast5Games}
                        awayLast5Games={awayLast5Games}
                        homeTeam={homeTeam}
                        awayTeam={awayTeam}
                        getReadableOutcome={getReadableOutcome}
                    />
                    <TimeForGoalBar homeGoalIntervals={homeTeam.home_statistic.goal_intervals} awayGoalIntervals={awayTeam.away_statistic.goal_intervals} />
                    <StatisticsTable stats={currentStats} view={view} handleViewChange={handleViewChange} />
                    <CardsTable homeTeam={homeTeam} awayTeam={awayTeam} />
                </div>
            </section>
        </>
    )
}
