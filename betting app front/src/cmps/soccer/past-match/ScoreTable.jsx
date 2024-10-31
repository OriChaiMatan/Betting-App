import React from 'react'
import { Link } from 'react-router-dom';
import { ProgressBar } from './ProgressBar'

export function ScoreTable({ match }) {

    const categorizeCards = (cards) => {
        const homeCards = { yellow: 0, red: 0 };
        const awayCards = { yellow: 0, red: 0 };

        cards.forEach((card) => {
            if (card.home_fault) {
                if (card.card === 'yellow card') homeCards.yellow += 1;
                if (card.card === 'red card') homeCards.red += 1;
            }
            if (card.away_fault) {
                if (card.card === 'yellow card') awayCards.yellow += 1;
                if (card.card === 'red card') awayCards.red += 1;
            }
        });

        return { homeCards, awayCards };
    };

    const { homeCards, awayCards } = categorizeCards(match.cards || []);

    return (
        <section>
            <Link to={'/'} className="link"><a className="btn-text">Back to Past Games</a></Link>
            <div className="score-table">
                <div className='table-header'>
                    <div className="team-info">
                        <img src={match.team_home_badge} alt={`${match.match_hometeam_name} badge`} />
                        <h3 className='heading-tertiary'>{match.match_hometeam_name}</h3>
                        <h3 className='heading-tertiary'>{match.match_hometeam_score}</h3>
                    </div>
                    <span>Full game</span>
                    <div className="team-info">
                        <h3 className='heading-tertiary'>{match.match_awayteam_score}</h3>
                        <h3 className='heading-tertiary'>{match.match_awayteam_name}</h3>
                        <img src={match.team_away_badge} alt={`${match.match_awayteam_name} badge`} />
                    </div>
                </div>
                <section className='table-content'>
                    <div className='table-row'>
                        <span>Goals</span>
                        <div className='progress-display'>
                            <span>{match.match_hometeam_score}</span>
                            <ProgressBar homeTaemData={match.match_hometeam_score} awayTeamData={match.match_awayteam_score} />
                            <span>{match.match_awayteam_score}</span>
                        </div>
                    </div>
                    <div className='table-row'>
                        <span>Half Time Score</span>
                        <div className='progress-display'>
                            <span>{match.match_hometeam_halftime_score}</span>
                            <ProgressBar homeTaemData={match.match_hometeam_halftime_score} awayTeamData={match.match_awayteam_halftime_score} />
                            <span>{match.match_awayteam_halftime_score}</span>
                        </div>
                    </div>
                    {match.statistics.map(stat => (
                        <div className='table-row' key={stat.type}>
                            <span>{stat.type}</span>
                            <div className='progress-display'>
                                <span>{stat.home}</span>
                                <ProgressBar
                                    homeTaemData={parseInt(stat.home, 10)}
                                    awayTeamData={parseInt(stat.away, 10)}
                                />
                                <span>{stat.away}</span>
                            </div>
                        </div>
                    ))}
                    <div className='cards'>
                        <div className='teams-cards'>
                            <a className='yellow-card'>{homeCards.yellow}</a>
                            <a className='red-card'>{homeCards.red}</a>
                        </div>
                        <span>Cards</span>
                        <div className='teams-cards'>
                            <a className='yellow-card'>{awayCards.yellow}</a>
                            <a className='red-card'>{awayCards.red}</a>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    )
}