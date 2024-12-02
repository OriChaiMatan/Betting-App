import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { leaguesService } from "../../services/leagues.service"
import { CallToActionHeader } from "../../cmps/soccer/future-match/CallToActionHeader"

export function SoccerTeamDetails() {
    const [team, setTeam] = useState(null)
    const { leagueId, teamId } = useParams()

    useEffect(() => {
        loadTeam()
    }, [leagueId, teamId])

    async function loadTeam() {
        try {
            const data = await leaguesService.getTeamByLeagueAndTeamId(leagueId, teamId)
            setTeam(data)
        } catch (err) {
            console.log('Error in load team', err)
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
            </div>
        </>
    )
}