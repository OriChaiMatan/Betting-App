import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router"
import { leaguesService } from "../../services/leagues.service"
import { gamesService } from "../../services/games.service"
import { CallToActionHeader } from "../../cmps/soccer/future-match/CallToActionHeader"
import { TeamSlider } from "../../cmps/soccer/league-details/TeamsSlider"
import { MatchSection } from "../../cmps/soccer/league-details/MatchSection"
import { SkeletonLeagueDetails } from "../../cmps/loaders/SkeletonLeagueDetails"
import { SkeletonTabelHomePage } from "../../cmps/loaders/SkeletonTabelHomePage"
import { SkeletonLeaguePreview } from "../../cmps/loaders/SkeletonLeaguePreview"

export function SoccerLeagueDetails() {
    const [league, setLeague] = useState(null)
    const [pastMatches, setPastMatches] = useState([])
    const [futureMatches, setFutureMatches] = useState([])
    const params = useParams()

    useEffect(() => {
        loadLeague()
        loadMatches()
    }, [params.leagueId])

    async function loadLeague() {
        try {
            const data = await leaguesService.getLeagueById(params.leagueId)
            setLeague(data)
        } catch (err) {
            console.log('Error in load league', err)
        }
    }

    async function loadMatches() {
        try {
            const pastData = await gamesService.getPastGames()
            const futureData = await gamesService.getFutureGames()
            const filteredPastMatches = pastData.filter(match => match.league_id === params.leagueId)
            const filteredFutureMatches = futureData.filter(match => match.league_id === params.leagueId)

            setPastMatches(filteredPastMatches)
            setFutureMatches(filteredFutureMatches)
        } catch (err) {
            console.log('Error in loading matches', err)
        }
    }

    return (
        <div className="league-details">
            <CallToActionHeader />
            {!league ? (
                <SkeletonLeagueDetails />
            ) : (
                <div className="league-header">
                    <img
                        src={league.league_logo}
                        alt={`${league.league_name} logo`}
                        className="league-logo"
                    />
                    <div className="league-details">
                        <h1 className="league-name">{league.league_name}</h1>
                        <p className="league-season">Season: {league.league_season}</p>
                        <div className="country-info">
                            {league.country_logo && (
                                <img
                                    src={league.country_logo}
                                    alt={`${league.country_name} flag`}
                                    className="country-logo"
                                />
                            )}
                            <span className="country-name">{league.country_name}</span>
                        </div>
                    </div>
                </div>
            )}
            {!league ? (
                <SkeletonLeaguePreview cards={7} />
            ) : (
                <TeamSlider league={league} />
            )}
            {pastMatches.length === 0 && futureMatches.length === 0 ? (
                <SkeletonTabelHomePage />
            ) : (
                <MatchSection pastMatches={pastMatches.slice(0, 3)} futureMatches={futureMatches.slice(0, 3)} />
            )}
            <div className="navigate-to-match">
                <Link to={'/past-match'} className='link-to-matches' >
                    <span>All Previous Matches</span>
                </Link>
                <Link to={'/future-match'} className='link-to-matches' >
                    <span>All Future Matches</span>
                </Link>
            </div>
        </div>
    )
}
