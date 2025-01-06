import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { leaguesService } from "../../services/leagues.service"
import { gamesService } from "../../services/games.service"
import { userService } from "../../services/user.service"
import { CallToActionHeader } from "../../cmps/soccer/future-match/CallToActionHeader"
import { TeamSlider } from "../../cmps/soccer/league-details/TeamsSlider"
import { MatchSection } from "../../cmps/soccer/league-details/MatchSection"
import { SkeletonLeagueDetails } from "../../cmps/loaders/SkeletonLeagueDetails"
import { SkeletonTabelHomePage } from "../../cmps/loaders/SkeletonTabelHomePage"
import { SkeletonLeaguePreview } from "../../cmps/loaders/SkeletonLeaguePreview"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { FaRegStar } from "react-icons/fa6"
import { FaStar } from "react-icons/fa"

export function SoccerLeagueDetails() {
    const [league, setLeague] = useState(null)
    const [pastMatches, setPastMatches] = useState([])
    const [futureMatches, setFutureMatches] = useState([])
    const [isFavorite, setIsFavorite] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadLeague()
        loadMatches()
        const loggedInUser = userService.getLoggedinUser()
        if (loggedInUser && loggedInUser.favoriteLeagues) {
            setIsFavorite(loggedInUser.favoriteLeagues.includes(params.leagueId))
        }
    }, [params.leagueId])

    async function loadLeague() {
        try {
            const data = await leaguesService.getLeagueById(params.leagueId)
            setLeague(data)
        } catch (err) {
            console.log('Error in load league', err)
            showErrorMsg('Error in fetch League, Please try again')
            navigate(-1)
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
            showErrorMsg('Error in fetch matches, Please try again')
        }
    }

    async function onUpdateUser(user) {
        try {
            const response = await userService.update(user)
            userService.updateLocalUserFields(user)
        } catch (err) {
            console.log('Error in onUpdateUser', err)
        }
    }

    async function toggleFavorite() {
        if (!league) {
            console.error('League not loaded yet')
            return
        }

        const loggedInUser = userService.getLoggedinUser()
        if (!loggedInUser) {
            // Show error message when the user is not logged in
            showErrorMsg('You need to be logged in to favorite this league!')
            return
        }

        const prevState = isFavorite // Save previous state
        setIsFavorite(!prevState) // Optimistic update

        const updatedUser = { ...loggedInUser }
        if (!updatedUser.favoriteLeagues) updatedUser.favoriteLeagues = [] 

        if (prevState) {
            updatedUser.favoriteLeagues = updatedUser.favoriteLeagues.filter(
                (leagueId) => leagueId !== league.league_id
            )
        } else {
            updatedUser.favoriteLeagues.push(league.league_id)
        }

        try {
            const savedUser = await onUpdateUser(updatedUser) // Pass the correct object
            userService.updateLocalUserFields(savedUser) // Sync local storage
        } catch (err) {
            console.error('Error updating user:', err)
            setIsFavorite(prevState); // Revert to previous state if update fails
            showErrorMsg('Error updating favorite leagues, please try again')
        }
    }


    return (
        <div className="league-details">
            <CallToActionHeader />
            {!league ? (
                <SkeletonLeagueDetails />
            ) : (
                <div className="league-header">
                    <div className="add-to-favorite" onClick={toggleFavorite}>
                        {isFavorite ? (
                            <FaStar className="favorite-icon" />
                        ) : (
                            <FaRegStar className="favorite-icon" />
                        )}
                    </div>
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
