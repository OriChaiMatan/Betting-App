import React from 'react'

export function CardsTable({ homeTeam, awayTeam }) {
    return (
        <div className='cards-table'>
            <div className="title">
                <h3 className="heading-tertiary">Probability of Cards</h3>
            </div>
            <div className="cards-data">
                <div className="team-data">
                    <div className="team-title">
                        <h3 className="heading-tertiary">Home</h3>
                    </div>
                    <div className="team-cards">
                        <span className='yellow-card'>{homeTeam.home_statistic.yellow_card_percentage} %</span>
                        <span className='red-card'>{homeTeam.home_statistic.red_card_percentage} %</span>
                    </div>
                </div>
                <div className="team-data">
                    <div className="team-title">
                        <h3 className="heading-tertiary">Away</h3>
                    </div>
                    <div className="team-cards">
                        <span className='red-card'>{awayTeam.away_statistic.red_card_percentage} %</span>
                        <span className='yellow-card'>{awayTeam.away_statistic.yellow_card_percentage} %</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
