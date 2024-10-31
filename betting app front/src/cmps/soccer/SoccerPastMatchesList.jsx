import React from 'react'
import { SoccerPastMatchesPreview } from './SoccerPastMatchesPreview'

export function SoccerPastMatchesList({matches}) {

  if (!matches) return <div>No past games available</div>

  return (
    <ul className='matches-list'>
      {matches.map((match) => (
        <li key={match.match_id}>
          <SoccerPastMatchesPreview match={match} />
        </li>
      ))}
    </ul>
  )
}