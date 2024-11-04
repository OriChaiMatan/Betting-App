import React from 'react'
import { Link } from 'react-router-dom'
import { utilService } from '../../../services/util.service'
import { RxCross1 } from "react-icons/rx"

export function SoccerFutureMatchesPreview({ match }) {
    return (
        <section className='future-match-preview'>
            <div className='match-data-preview'>
                <div className='league-data-preview'>
                    <img src={match.league_logo} alt="League Logo" />
                    <span>{match.league_name}</span>
                </div>
                <div className='match-date'>
                    <span>{match.match_time}</span>
                    <span>{utilService.formatDate(match.match_date)}</span>
                </div>
            </div>
            <div className='teams-data-preview'>
                <div className='team-preview left'>  {/* On click navigate to team page */}
                    <img src={match.team_home_badge} alt="Home team badge" />
                    <h3 className='heading-tertiary'>{match.match_hometeam_name}</h3>
                </div>
                <div className='vs'>
                    <span>VS</span>
                </div>
                <div className='team-preview right'>  {/* On click navigate to team page */}
                    <img src={match.team_away_badge} alt="Home team badge" />
                    <h3 className='heading-tertiary'>{match.match_awayteam_name}</h3>
                </div>
            </div>
            <div className='odds-1x2'> {/* Option for future- when click on odds option it will take the user to affiliate site ????? */}
                <span>1 <a>2.79</a></span>
                <span><RxCross1 /> <a>1.22</a></span>
                <span>2 <a>4.21</a></span>
            </div>
            <Link to={`/future-match-details/${match.match_id}`} className='link'><span>More Odds</span></Link>
        </section> 
    )
}