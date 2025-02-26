import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

import { leaguesService } from "../../services/leagues.service"
import { gamesService } from "../../services/games.service"
import { userService } from "../../services/user.service"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"

import { loadPreviousMatches } from '../../store/actions/previous-match.action'

import { CallToActionHeader } from "../../cmps/soccer/future-match/CallToActionHeader"
import { NextMatch } from "../../cmps/soccer/team-details/NextMatch"
import { TeamStatistics } from "../../cmps/soccer/team-details/TeamStatistics"
import { MatchList } from "../../cmps/soccer/team-details/MatchList"
import { SkeletonTeamInfoDetails } from "../../cmps/loaders/SkeletonTeamInfoDetails"
import { SkeletonNextMatchTeamDetails } from "../../cmps/loaders/SkeletonNextMatchTeamDetails"
import { SkeletonTeamStatistics } from "../../cmps/loaders/SkeletonTeamStatistics"
import { SkeletonTabelHomePage } from "../../cmps/loaders/SkeletonTabelHomePage"

import { PiSoccerBallFill } from "react-icons/pi"
import { FcStatistics } from "react-icons/fc"
import { FaHistory } from "react-icons/fa"
import { FaRegStar } from "react-icons/fa6"
import { FaStar } from "react-icons/fa"

export function SoccerTeamDetails() {
    const previousMatches = useSelector((storeState) => storeState.previousMatchModule.previousMatches)

    const [team, setTeam] = useState(null)
    const [nextMatch, setNextMatch] = useState(null)
    const [pastMatches, setPastMatches] = useState([])
    const [isFavorite, setIsFavorite] = useState(false)
    const { leagueId, teamId } = useParams()
    const navigate = useNavigate()

    const API_KEY = import.meta.env.VITE_API_KEY
    const BASE_URL = import.meta.env.VITE_BASE_URL

    useEffect(() => {
        loadTeam()
        fetchNextMatch()
        loadPastMatches()
        checkIfFavorite()
    }, [leagueId, teamId])

    async function loadTeam() {
        try {
            const data = await leaguesService.getTeamByLeagueAndTeamId(leagueId, teamId)
            setTeam(data)
        } catch (err) {
            console.log('Error in load team', err)
            showErrorMsg('Error in fetch Team data, Please try again')
            navigate(-1)
        }
    }

    async function fetchNextMatch() {
        try {
            const match = await getNextMatch(teamId, leagueId)
            setNextMatch(match)
        } catch (err) {
            console.error("Error loading next match:", err)
            showErrorMsg('Error in fetch Future Matches, Please try again')
        }
    }

    async function loadPastMatches() {
        try {
            await loadPreviousMatches()
            const filteredPastMatches = previousMatches.filter(match => match.match_hometeam_id === teamId || match.match_awayteam_id === teamId)
            const sortedMatches = filteredPastMatches.sort((a, b) => new Date(b.match_date) - new Date(a.match_date))
            const slicedMatches = sortedMatches.slice(0, 3)
            setPastMatches(slicedMatches)
        } catch (err) {
            console.log('Error in load team', err)
            showErrorMsg('Error in fetch Previous Matches, Please try again')
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

    function checkIfFavorite() {
        const loggedInUser = userService.getLoggedinUser()
        if (loggedInUser && loggedInUser.favoriteTeams) {
            // Check if the team is in the user's favoriteTeams
            const isFav = loggedInUser.favoriteTeams.some(
                (favorite) => favorite.leagueId === leagueId && favorite.teamId === teamId
            )
            setIsFavorite(isFav)
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
        const loggedInUser = userService.getLoggedinUser()
        if (!loggedInUser) {
            // Show error message when the user is not logged in
            showErrorMsg('You need to be logged in to favorite this team!');
            return;
        }

        const prevState = isFavorite; // Save the previous state for rollback
        setIsFavorite(!prevState); // Optimistic update

        const updatedUser = { ...loggedInUser };
        if (!updatedUser.favoriteTeams) updatedUser.favoriteTeams = [];

        // Check if the current team is already in the favorites
        const favoriteIndex = updatedUser.favoriteTeams.findIndex(
            (favorite) => favorite.leagueId === leagueId && favorite.teamId === teamId
        );

        if (prevState) {
            // Remove from favorites
            if (favoriteIndex > -1) {
                updatedUser.favoriteTeams.splice(favoriteIndex, 1);
            }
        } else {
            // Add to favorites
            updatedUser.favoriteTeams.push({ leagueId, teamId });
        }

        try {
            const savedUser = await onUpdateUser(updatedUser); // Update user on the backend
            userService.updateLocalUserFields(savedUser); // Sync updated user locally
        } catch (err) {
            console.error("Error updating user:", err);
            setIsFavorite(prevState); // Revert state on error
            showErrorMsg("Error updating favorite teams, please try again.");
        }
    }

    return (
        <div className="team-details-page">
            <CallToActionHeader />
            <div className="team-card">
                {!team ? (
                    <SkeletonTeamInfoDetails />
                ) : (
                    <div className="team-card-header">
                        <img src={team.team_badge} alt={`${team.team_name} Badge`} className="team-badge" />
                        <h2 className="team-name">{team.team_name}</h2>
                        <p className="team-country">{team.team_country}, {team.team_founded ? `Founded: ${team.team_founded}` : "Founded: N/A"}</p>
                        <h3>Venue: {team.venue.venue_name}, {team.venue.venue_city} | Capacity: {team.venue.venue_capacity} | Surface: {team.venue.venue_surface}</h3>
                        <div className="add-to-favorite-team" onClick={toggleFavorite}>
                            {isFavorite ? (
                                <>
                                    <FaStar className="favorite-icon" />
                                    <span>Remove Team from your favorite list</span>
                                </>
                            ) : (
                                <>
                                    <FaRegStar className="favorite-icon" />
                                    <span>Add Team to your favorite list !</span>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="team-section">
                <h2><PiSoccerBallFill className='icon' /> Team Next Match:</h2>
                {!nextMatch ? (
                    <SkeletonNextMatchTeamDetails />
                ) : (
                    <NextMatch match={nextMatch} />
                )}
            </div>
            <div className="team-section">
                <h2><FcStatistics className='icon' /> Team Statistics:</h2>
                {!team ? (
                    <SkeletonTeamStatistics />
                ) : (
                    <TeamStatistics team={team} />
                )}
            </div>
            <div className="team-section">
                <h2><FaHistory className='icon blue' /> Team Previous Matches:</h2>
                {pastMatches.length === 0 ? (
                    <SkeletonTabelHomePage />
                ) : (
                    <MatchList matches={pastMatches} />
                )}
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
    )
}