import { Link } from 'react-router-dom'
import { utilService } from '../../../services/util.service'

export function TeamMatchPreview({ match }) {

    return (
        <section className='leagues-match-preview'>
              <Link to={`/past-match-details/${match.match_id}`} className='link'>
                <div className='match-data-preview'>
                    <div className='league-data-preview'>
                        <span>{match.country_name}</span>
                        <span>-</span>
                        <span>{match.league_name}</span>
                    </div>
                    <div className='match-date'>
                        <span>{match.match_time}</span>
                        <span>{utilService.formatDate(match.match_date)}</span>
                    </div>
                </div>
                <div className="match-data">
                    <div className='teams'>
                        <div className='team-preview'>
                            <img src={match.team_home_badge} alt="Home team badge" />
                            <h3 className='heading-tertiary'>{match.match_hometeam_name} - Home Team</h3>
                        </div>
                        <div className='team-preview'>
                            <img src={match.team_away_badge} alt="Home team badge" />
                            <h3 className='heading-tertiary'>{match.match_awayteam_name} - Away Team</h3>
                        </div>
                    </div>
                    <div className="score">
                        <span>{match.match_hometeam_score}</span>
                        <span>:</span>
                        <span>{match.match_awayteam_score}</span>
                    </div>
                </div>
            </Link>
        </section>
    )
}