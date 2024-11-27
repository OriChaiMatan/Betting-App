import React from 'react'
import { LeaguePreview } from './LeaguePreview'

export function LeaguesList({ leagues }) {

    if (!leagues) return <div>Loading leagues...</div>
    return (
        <div className='leagues-list'>
            <h1 className="leagues-title">Top Soccer Leagues</h1>
            <div className="leagues-grid">
                {leagues.map((league) => (
                    <li key={league.league_id}>
                        <LeaguePreview league={league} />
                    </li>
                ))}
            </div>
        </div>
    )
}