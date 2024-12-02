import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { leaguesService } from "../../services/leagues.service"
import { gamesService } from "../../services/games.service"
import { CallToActionHeader } from "../../cmps/soccer/future-match/CallToActionHeader"
import { NextMatch } from "../../cmps/soccer/team-details/NextMatch"
import { TeamStatistics } from "../../cmps/soccer/team-details/TeamStatistics"
import { MatchList } from "../../cmps/soccer/team-details/MatchList"
import { PiSoccerBallFill } from "react-icons/pi"
import { FcStatistics } from "react-icons/fc"
import { FaHistory } from "react-icons/fa"

export function SoccerTeamDetails() {
    const [team, setTeam] = useState(null)
    const [nextMatch, setNextMatch] = useState(null)
    const [pastMatches, setPastMatches] = useState([])
    const { leagueId, teamId } = useParams()

    const API_KEY = import.meta.env.VITE_API_KEY
    const BASE_URL = import.meta.env.VITE_BASE_URL

    useEffect(() => {
        loadTeam()
        fetchNextMatch()
        loadPastMatches()
    }, [leagueId, teamId])

    async function loadTeam() {
        try {
            const data = await leaguesService.getTeamByLeagueAndTeamId(leagueId, teamId)
            setTeam(data)
        } catch (err) {
            console.log('Error in load team', err)
        }
    }

    async function fetchNextMatch() {
        try {
            const match = await getNextMatch(teamId, leagueId)
            setNextMatch(match)
        } catch (err) {
            console.error("Error loading next match:", err)
        }
    }

    async function loadPastMatches() {
        try {
            const data = await gamesService.getPastGames()
            const filteredPastMatches = data.filter(match => match.match_hometeam_id === teamId || match.match_awayteam_id === teamId)
            const sortedMatches = filteredPastMatches.sort((a, b) => new Date(b.match_date) - new Date(a.match_date))
            const slicedMatches = sortedMatches.slice(0, 3)
            setPastMatches(slicedMatches)
        } catch (err) {
            console.log('Error in load team', err)
        }
    }

    async function getNextMatch(teamId, leagueId) {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1) // Start from tomorrow
        const fromDate = tomorrow.toISOString().split("T")[0]

        const twoWeeksLater = new Date()
        twoWeeksLater.setDate(tomorrow.getDate() + 14) // Extend two weeks from tomorrow
        const toDate = twoWeeksLater.toISOString().split("T")[0]

        const url = `${BASE_URL}?action=get_events&from=${fromDate}&to=${toDate}&team_id=${teamId}&league_id=${leagueId}&APIkey=${API_KEY}`

        try {
            const response = await fetch(url)
            const data = await response.json()

            // Sort by date to find the closest match
            const sortedMatches = data.sort((a, b) =>
                new Date(a.match_date) - new Date(b.match_date)
            )

            return sortedMatches.length ? sortedMatches[0] : null // Return the closest match or null if none found
        } catch (err) {
            console.error("Error fetching next match:", err)
            throw err
        }
    }

    if (!team) return <div>loading team...</div>
    return (
        <>
            <div className="team-details-page">
                <CallToActionHeader />
                <div className="team-card">
                    <div className="team-card-header">
                        <img src={team.team_badge} alt={`${team.team_name} Badge`} className="team-badge" />
                        <h2 className="team-name">{team.team_name}</h2>
                        <p className="team-country">{team.team_country}, {team.team_founded ? `Founded: ${team.team_founded}` : "Founded: N/A"}</p>
                        <h3>Venue: {team.venue.venue_name}, {team.venue.venue_city} | Capacity: {team.venue.venue_capacity} | Surface: {team.venue.venue_surface}</h3>
                    </div>
                </div>
                <div className="team-section">
                    <h2><PiSoccerBallFill className='icon' /> Team Next Match:</h2>
                    <NextMatch match={nextMatch} />

                </div>
                <div className="team-section">
                    <h2><FcStatistics className='icon' /> Team Statistics:</h2>
                    <TeamStatistics team={team} />
                </div>
                <div className="team-section">
                    <h2><FaHistory className='icon blue' /> Team Previous Matches:</h2>
                    <MatchList matches={pastMatches} />
                </div>
                <div className="navigate-to-match">
                    <Link to={'/past-match'} className='link-to-matches' >
                        <span>All Previous Matches</span>
                    </Link>
                    <Link to={'/future-match'} className='link-to-matches' >
                        <span>All Future Matches</span>
                    </Link>
                </div>
            </div>
        </>
    )
}