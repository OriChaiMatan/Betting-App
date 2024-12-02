import React from 'react'
import { TeamMatchPreview } from './MatchPreview'

export function MatchList({matches}) {

    if (!matches) return <div>No future games available</div>
    return (
      <ul className='league-match-list'>
        {matches.map((match) => (
          <li key={match.match_id}>
            <TeamMatchPreview match={match} />
          </li>
        ))}
      </ul>
    )
}