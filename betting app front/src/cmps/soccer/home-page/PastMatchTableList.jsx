import React from 'react'
import { PastMatchTablePreview } from './PastMatchTablePreview'

export function PastMatchTableList({matches}) {

  if (!matches) return <div>No future games available</div>

  return (
    <ul className='match-table-list'>
      {matches.map((match) => (
        <li key={match.match_id}>
          <PastMatchTablePreview match={match} />
        </li>
      ))}
    </ul>
  )
}