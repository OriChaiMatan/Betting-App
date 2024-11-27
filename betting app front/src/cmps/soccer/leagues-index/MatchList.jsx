import React from 'react'
import { LeagueMatchPreview } from './MatchPreview'

export function MatchList({matches}) {

    if (!matches) return <div>No future games available</div>
    return (
      <ul className='league-match-list'>
        {matches.map((match) => (
          <li key={match.match_id}>
            <LeagueMatchPreview match={match} />
          </li>
        ))}
      </ul>
    )
}