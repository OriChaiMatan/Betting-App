import React from 'react'

export function SoccerPastMatchesPreview({ match }) {

  const formatDate = (date) => {
    const [year, month, day] = date.split("-")
    return `${day}/${month}/${year}`
  }

  return (
    <section className='past-match-preview'>
      <div className='league-data-preview'>
        <img src={match.league_logo} alt="League Logo" />
        <h3 className='heading-tertiary'>{match.league_name}</h3>
        <span>Season: {match.league_year}</span>
      </div>
      <div className='past-match-date'>
        <h3 className='heading-tertiary'>{formatDate(match.match_date)}</h3>
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
  )
}