import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { leaguesService } from "../../services/leagues.service"
import { CallToActionHeader } from "../../cmps/soccer/future-match/CallToActionHeader"

export function SoccerTeamDetails() {
    const [team, setTeam] = useState(null)
    const {leagueId, teamId} = useParams()

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


    console.log(team)

    if (!team) return <div>loading team...</div>
    return (
        <div className="team-details-page">
            <CallToActionHeader />
            {team.team_name}
        </div>
    )
}