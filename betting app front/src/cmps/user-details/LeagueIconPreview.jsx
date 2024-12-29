import React from 'react'
import { Link } from 'react-router-dom'

export function LeagueIconPreview({ league }) {
    return (
        <Link to={`/league-details/${league.league_id}`} className="link">
            <div className="league-card" key={league.league_id}>
                <div className="league-logo">
                    <img
                        src={league.league_logo || 'https://via.placeholder.com/100x100?text=No+Logo'}
                        alt={`${league.league_name} logo`}
                    />
                </div>
                <div className="league-info">
                    <h3>{league.league_name}</h3>
                </div>
            </div>
        </Link>
    )
}