import React from 'react'
import { FutureMatchTablePreview } from './FutureMatchTablePreview'

export function FutureMatchTableList({matches}) {

  if (!matches) return <div>No future games available</div>

  return (
    <ul className='match-table-list'>
      {matches.map((match) => (
        <li key={match.match_id}>
          <FutureMatchTablePreview match={match} />
        </li>
      ))}
    </ul>
  )
}