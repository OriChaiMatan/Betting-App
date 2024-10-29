import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { utilService } from '../../services/util.service'

export function SoccerPastMatchesPreview({ match }) {

  return (
    <Link to={`/match-details/${match.match_id}`} className="link">
      <section className='past-match-preview'>
        <div className='league-data-preview'>
          <img src={match.league_logo} alt="League Logo" />
          <h3 className='heading-tertiary'>{match.league_name}</h3>
          <span>Season: {match.league_year}</span>
        </div>
        <div className='past-match-date'>
          <h3 className='heading-tertiary'>{match.match_time}</h3>
          <h3 className='heading-tertiary'>{utilService.formatDate(match.match_date)}</h3>
        </div>
        <div className='teams-data-preview'>
          <div className='team-preview'>
            <img src={match.team_home_badge} alt="Home team badge" />
            <span>Home Team</span>
            <h3 className='heading-tertiary'>{match.match_hometeam_name}</h3>
          </div>
          <div className='score-preview'>
            <h2 className='heading-secondary'>{match.match_hometeam_score} : {match.match_awayteam_score}</h2>
          </div>
          <div className='team-preview'>
            <img src={match.team_away_badge} alt="Home team badge" />
            <span>Away Team</span>
            <h3 className='heading-tertiary'>{match.match_awayteam_name}</h3>
          </div>
        </div>
      </section>
    </Link>
  )
}