import React from 'react'
import { MatchIconPreview } from './MatchIconPreview'

export function MatchesIconList({ matches }) {
    return (
        <div className='matches-icon-list'>{matches.map((match) => (
            <li key={match.match_id}>
                <MatchIconPreview match={match} />
            </li>
        ))}</div>
    )
}