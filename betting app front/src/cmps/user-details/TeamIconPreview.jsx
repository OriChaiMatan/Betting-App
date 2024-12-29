import React from 'react'
import { Link } from "react-router-dom"

export function TeamIconPreview({ team }) {
    return (
        <div className="team-slider-item">
            <img src={team.team_badge} className="team-badge" />
            <div className="team-name">{team.team_name}</div>
        </div>
    )
}
