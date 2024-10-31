import React from 'react'
import { SoccerFutureMatchesPreview } from './SoccerFutureMatchesPreview' 

export function SoccerFutureMatchesList({matches}) {

  if (!matches) return <div>No future games available</div>

  return (
    <ul className='matches-list'>
      {matches.map((match) => (
        <li key={match.match_id}>
          <SoccerFutureMatchesPreview match={match} />
        </li>
      ))}
    </ul>
  )
}