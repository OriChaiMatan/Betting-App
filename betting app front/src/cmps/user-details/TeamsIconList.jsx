import React from 'react'
import { TeamIconPreview } from './TeamIconPreview'

export function TeamsIconList({teams}) {
    return (
        <div className='teams-icon-list'>{teams.map((team) => (
            <li key={team.team_key} onClick={() => handleLeagueClick(team)}>
                <TeamIconPreview team={team} />
            </li>
        ))}</div>
    )
}