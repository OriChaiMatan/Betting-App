import React from 'react'
import { MatchTablePreview } from './MatchTablePreview'

export function MatchTableList({matches}) {

  if (!matches) return <div>No future games available</div>

  return (
    <ul className='match-table-list'>
      {matches.map((match) => (
        <li key={match.match_id}>
          <MatchTablePreview match={match} />
        </li>
      ))}
    </ul>
  )
}