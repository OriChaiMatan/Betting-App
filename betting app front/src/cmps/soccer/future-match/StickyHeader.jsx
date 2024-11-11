import React from 'react'
import { utilService } from '../../../services/util.service'

export function StickyHeader({ match }) {
    return (
        <div className="sticky-header">
            <div className="team-data">
                <img src={match.team_home_badge} alt="Home team badge" />
                <h3 className='heading-tertiary'>{match.match_hometeam_name}</h3>
            </div>
            <div className="date">
                <h3 className='heading-tertiary'>{match.match_time}</h3>
                <h3 className='heading-tertiary'>{utilService.formatDate(match.match_date)}</h3>
            </div>
            <div className='team-data'>
                <h3 className='heading-tertiary'>{match.match_awayteam_name}</h3>
                <img src={match.team_away_badge} alt="Away team badge" />
            </div>
        </div>
    )
}