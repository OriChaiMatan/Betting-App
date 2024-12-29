import React from 'react'
import { Link } from 'react-router-dom'

export function MatchIconPreview({ match }) {
    const isPastMatch = new Date(match.match_date) < new Date()

    const matchDetailsPath = isPastMatch
        ? `/past-match-details/${match.match_id}`
        : `/future-match-details/${match.match_id}`

    return (
        <Link to={matchDetailsPath} className='link'>
            <div className='match-icon-preview'>
                <span>{match.league_name}</span>
                <span>{match.match_date}</span>
                <div className="teams-data">
                    <div className="team">
                        <img src={match.team_home_badge} alt="home" />
                        <span>{match.match_hometeam_name}</span>
                    </div>
                    <div className="vs">
                        <span>VS</span>
                    </div>
                    <div className="team">
                        <img src={match.team_away_badge} alt="away" />
                        <span>{match.match_awayteam_name}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
