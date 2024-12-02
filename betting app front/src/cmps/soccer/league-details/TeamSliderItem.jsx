import { Link } from "react-router-dom"

export function TeamSliderItem({ imgSrc, altText, nameLabel, leagueId, teamId }) {
    return (
        <Link to={`/team-details/${leagueId}/${teamId}`} className="link">
            <div className="team-slider-item">
                <img src={imgSrc} alt={altText} className="team-badge" />
                <div className="team-name">{nameLabel}</div>
            </div>
        </Link>
    )
}