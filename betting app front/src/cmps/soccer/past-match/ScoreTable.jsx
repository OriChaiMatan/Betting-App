import React from 'react'
import { useState } from 'react';

export function ScoreTable({ match }) {
    const [view, setView] = useState('fullMatch')

    const handleViewChange = (selectedView) => {
        setView(selectedView)
    }

    const getBarWidth = (homeValue, awayValue) => {
        const home = typeof homeValue === 'string' && homeValue.includes('%')
            ? parseFloat(homeValue)
            : parseInt(homeValue, 10)
        const away = typeof awayValue === 'string' && awayValue.includes('%')
            ? parseFloat(awayValue)
            : parseInt(awayValue, 10)
        const total = home + away;
        if (isNaN(home) || isNaN(away) || total === 0) {
            return { homeWidth: '50%', awayWidth: '50%' }
        }
    
        const homeWidth = `${(home / total) * 100}%`
        const awayWidth = `${(away / total) * 100}%`
        return { homeWidth, awayWidth }
    }

    const stats = view === "fullMatch" ? match.statistics : match.statistics_1half
    const time = view === "fullMatch" ? "Full Match" : "First Half"
    const home_goals = view === "fullMatch" ? match.match_hometeam_score : match.match_hometeam_halftime_score
    const away_goals = view === "fullMatch" ? match.match_awayteam_score : match.match_awayteam_halftime_score

    return (
        <section>
            <div className="score-table">
                <div className='table-header'>
                    <div className="team-info">
                        <img src={match.team_home_badge} alt={`${match.match_hometeam_name} badge`} />
                        <h3 className='heading-tertiary'>{match.match_hometeam_name}</h3>
                        <h3 className='heading-tertiary'>{home_goals}</h3>
                    </div>
                    <span>{time}</span>
                    <div className="team-info">
                        <h3 className='heading-tertiary'>{away_goals}</h3>
                        <h3 className='heading-tertiary'>{match.match_awayteam_name}</h3>
                        <img src={match.team_away_badge} alt={`${match.match_awayteam_name} badge`} />
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={() => handleViewChange("firstHalf")} className={view === 'firstHalf' ? 'active' : ''}>
                        First Half
                    </button>
                    <button onClick={() => handleViewChange("fullMatch")} className={view === 'fullMatch' ? 'active' : ''}>
                        Full Match
                    </button>
                </div>
                {stats.map((stat, idx) => {
                    const { homeWidth, awayWidth } = getBarWidth(stat.home, stat.away)
                    return (
                        <div className="statistics-row" key={idx}>
                            <div className="data-container">
                                <span>{stat.home}</span>
                                <span className="stat-label">{stat.type}</span>
                                <span>{stat.away}</span>
                            </div>
                            <div className="bars-container">
                                <div className="progress-bar-container">
                                    <div
                                        className="progress-bar"
                                        style={{ 
                                            width: awayWidth,
                                     }}
                                    ></div>
                                    <div
                                        className={`progress-bar ${stat.home >= stat.away ? 'big-value' : 'small-value'}`}
                                        style={{
                                            width: homeWidth
                                        }}
                                    ></div>
                                </div>
                                <div className="progress-bar-container">
                                    <div
                                        className={`progress-bar ${stat.away >= stat.home ? 'big-value' : 'small-value'}`}
                                        style={{
                                            width: awayWidth,
                                        }}
                                    ></div>
                                    <div
                                        className="progress-bar"
                                        style={{
                                            width: homeWidth,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    )
}