import React from 'react'

export function StatisticsTable({ stats, view, handleViewChange }) {
    const getBarWidth = (homeValue, awayValue) => {
        const total = homeValue + awayValue
        if (total === 0) return { homeWidth: '50%', awayWidth: '50%' }
        const homeWidth = `${(homeValue / total) * 100}%`
        const awayWidth = `${(awayValue / total) * 100}%`
        return { homeWidth, awayWidth }
    };

    return (
        <div className="statistic-table">
            <div className="title">
                <h3 className="heading-tertiary">Statistics</h3>
            </div>
            <div className="buttons">
                <button onClick={() => handleViewChange("fullMatch")} className={view === 'fullMatch' ? 'active' : ''}>
                    Full Match
                </button>
                <button onClick={() => handleViewChange("firstHalf")} className={view === 'firstHalf' ? 'active' : ''}>
                    First Half
                </button>
            </div>
            {stats.map((stat, idx) => {
                const { homeWidth, awayWidth } = getBarWidth(stat.homeValue, stat.awayValue);
                return (
                    <div className="statistics-row" key={idx}>
                        <div className="data-container">
                            <span>{stat.homeValue}</span>
                            <span className="stat-label">{stat.label}</span>
                            <span>{stat.awayValue}</span>
                        </div>
                        <div className="bars-container">
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${(stat.awayValue / (stat.homeValue + stat.awayValue)) * 100}%` }}
                                ></div>
                                <div
                                    className={`progress-bar ${stat.homeValue >= stat.awayValue ? 'big-value' : 'small-value'}`}
                                    style={{
                                        width: `${(stat.homeValue / (stat.homeValue + stat.awayValue)) * 100}%`,
                                    }}
                                ></div>
                            </div>
                            <div className="progress-bar-container">
                                <div
                                    className={`progress-bar ${stat.awayValue >= stat.homeValue ? 'big-value' : 'small-value'}`}
                                    style={{
                                        width: `${(stat.awayValue / (stat.homeValue + stat.awayValue)) * 100}%`,
                                    }}
                                ></div>
                                <div
                                    className="progress-bar"
                                    style={{
                                        width: `${(stat.homeValue / (stat.homeValue + stat.awayValue)) * 100}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
