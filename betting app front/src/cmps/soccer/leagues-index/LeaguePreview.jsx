import React from 'react'

export function LeaguePreview({ league }) {
    return (
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
    )
}