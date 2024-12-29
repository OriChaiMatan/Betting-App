import React, { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { gamesService } from '../services/games.service'
import { leaguesService } from '../services/leagues.service'
import { LeaguesIconList } from '../cmps/user-details/LeaguesIconList'

export function UserDetails() {
    const [user, setUser] = useState(null)
    const [matches, setMatches] = useState([])
    const [leagues, setLeagues] = useState([])
    const [teams, setTeams] = useState([])

    useEffect(() => {
        loadUser()
    }, [])

    useEffect(() => {
        if (user) {
            loadLeagues(user.favoriteLeagues || [])
            loadTeams(user.favoriteTeams || [])
            loadMatches(user.favoriteMatches || [])
        }
    }, [user])

    async function loadUser() {
        try {
            const loggedInUser = userService.getLoggedinUser()
            const data = await userService.getById(loggedInUser._id)
            setUser(data)
        } catch (err) {
            showErrorMsg('Error in fetch User data, Please try again')
            navigate(-1)
        }
    }

    async function loadTeams(favoriteTeams) {
        try {
            const teamPromises = favoriteTeams.map(({ leagueId, teamId }) =>
                leaguesService.getTeamByLeagueAndTeamId(leagueId, teamId)
            );

            const data = await Promise.all(teamPromises)
            setTeams(data.filter(team => team))
        } catch (err) {
            console.error('Error fetching teams:', err)
        }
    }

    async function loadMatches(matchIds) {
        try {
            const matchPromises = matchIds.map(async id => {
                const pastMatch = await gamesService.getPastMatchById(id).catch(() => null)
                if (pastMatch) return pastMatch;

                const futureMatch = await gamesService.getFutureMatchById(id).catch(() => null)
                return futureMatch
            });

            const data = await Promise.all(matchPromises)
            setMatches(data.filter(match => match))
        } catch (err) {
            console.log('Error in fetching matches, please try again')
        }
    }

    async function loadLeagues(leagueIds) {
        try {
            const leaguePromises = leagueIds.map(id => leaguesService.getLeagueById(id))
            const data = await Promise.all(leaguePromises)
            setLeagues(data)
        } catch (err) {
            console.log('Error in fetching leagues, please try again')
        }
    }

    async function toggleNotifications() {
        if (!user) return;

        const updatedUser = {
            ...user,
            allowNotifications: !user.allowNotifications,
        };

        try {
            await userService.update(updatedUser)
            setUser(updatedUser)
            showSuccessMsg(`Notifications ${updatedUser.allowNotifications ? 'enabled' : 'disabled'}`)
        } catch (err) {
            showErrorMsg('Failed to update notifications, please try again')
        }
    }

    if (!user) return <div>Loading...</div>

    return (
        <div className="user-details">
            <div className="user-header">
                <h1>{user.fullname}</h1>
            </div>
            <section className="account-info">
                <h2>Account Information:</h2>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Signup Date:</strong>{' '}
                    {new Date(user.createAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
                <p>
                    <strong>Notifications:</strong>{' '}
                    <button
                        className="edit-notifications-btn"
                        onClick={toggleNotifications}
                    >
                        {user.allowNotifications ? 'Turn off' : 'Turn on'}
                    </button>
                </p>
            </section>
            <section className="account-data">
                <div className="data">
                    <h2>Favorited Leagues:</h2>
                    <LeaguesIconList leagues={leagues} />
                </div>

                <h2>Teams</h2>
                <ul>
                    {teams.map(team => (
                        <li key={team.team_key}>{team.team_name}</li>
                    ))}
                </ul>

                <h2>Matches</h2>
                <ul>
                    {matches.map(match => (
                        <li key={match.match_id}>
                            {match.match_hometeam_name} vs {match.match_awayteam_name} -{' '}
                            {match.match_date}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
