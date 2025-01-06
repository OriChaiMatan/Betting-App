import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link, useNavigate } from "react-router-dom"
import { gamesService } from "../../services/games.service"
import { utilService } from "../../services/util.service"
import { userService } from "../../services/user.service"
import { ScoreTable } from "../../cmps/soccer/past-match/ScoreTable"
import { StickyHeader } from "../../cmps/soccer/StickyHeader"
import { CallToActionHeader } from "../../cmps/soccer/future-match/CallToActionHeader"
import { MatchSummary } from "../../cmps/soccer/past-match/MatchSummary"
import { SkeletonPastMatchDetails } from "../../cmps/loaders/SkeletonPastMatchDetails"
import { MdOutlinePlace } from "react-icons/md"
import { FaRegStar } from "react-icons/fa6"
import { FaStar } from "react-icons/fa"


export function SoccerPastMatchDetails() {
    const [match, setMatch] = useState(null)
    const [isSticky, setIsSticky] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMatch()
        const loggedInUser = userService.getLoggedinUser()
        if (loggedInUser && loggedInUser.favoriteMatches) {
            setIsFavorite(loggedInUser.favoriteMatches.includes(params.matchId))
        }
    }, [params.matchId])

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
            const match = await gamesService.getPastMatchById(params.matchId)
            setMatch(match)
        } catch (err) {
            console.log('Error in load past match', err)
            showErrorMsg('Error in fetch Previous Match, Please try again')
            navigate("/past-match")
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
        if (!match) {
            console.error('Match not loaded yet')
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
        if (!updatedUser.favoriteMatches) updatedUser.favoriteMatches = []

        if (prevState) {
            updatedUser.favoriteMatches = updatedUser.favoriteMatches.filter(
                (matchId) => matchId !== match.match_id
            )
        } else {
            updatedUser.favoriteMatches.push(match.match_id)
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

    if (!match) return <SkeletonPastMatchDetails />
    return (
        <>
            {isSticky && <StickyHeader match={match} />}
            <section className="past-match-details">
                <div className="call-to-action-header"><CallToActionHeader /></div>
                <Link to={`/league-details/${match.league_id}`} className="link">
                    <div className='league-data'>
                        <img src={match.league_logo} alt="League Logo" />
                        <div className="league-info">
                            <h3 className='heading-tertiary'>{match.league_name}</h3>
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
                    </ Link>
                    <div className='score-preview'>
                        <h2 className='heading-secondary'>{match.match_hometeam_score} : {match.match_awayteam_score}</h2>
                    </div>
                    <Link to={`/team-details/${match.league_id}/${match.match_awayteam_id}`} className="link">
                        <div className='team-preview'>
                            <img src={match.team_away_badge} alt="Home team badge" />
                            <span>Away Team</span>
                            <h3 className='heading-tertiary'>{match.match_awayteam_name}</h3>
                        </div>
                    </Link>
                </div>
                <div className="place-data">
                    <div className="stadium">
                        <MdOutlinePlace />
                        <h3 className="heading-tertiary">{match.match_stadium}</h3>
                    </div>
                    <div className="date">
                        <h3 className='heading-tertiary'>{match.match_time}</h3>
                        <h3 className='heading-tertiary'>{utilService.formatDate(match.match_date)}</h3>
                    </div>
                </div>
                <div className="statistic-data">
                    <div className="add-to-favorite-match" onClick={toggleFavorite}>
                        {isFavorite ? (
                            <>
                                <FaStar className="favorite-icon" />
                                <span>Remove match from your favorite list</span>
                            </>
                        ) : (
                            <>
                                <FaRegStar className="favorite-icon" />
                                <span>Add match to your favorite list!</span>
                            </>
                        )}
                    </div>
                    <MatchSummary match={match} />
                    <ScoreTable match={match} />
                </div>
            </section>
        </>
    )
}