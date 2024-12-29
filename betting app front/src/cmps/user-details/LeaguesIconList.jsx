import React from 'react'
import { LeagueIconPreview } from './LeagueIconPreview'

export function LeaguesIconList({leagues}) {
    return (
        <div className='leagues-icon-list'>{leagues.map((league) => (
            <li key={league.league_id} onClick={() => handleLeagueClick(league)}>
                <LeagueIconPreview league={league} />
            </li>
        ))}</div>
    )
}
