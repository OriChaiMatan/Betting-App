import React from 'react'
import { useState } from 'react'

export function CardsTable({ homeTeam, awayTeam }) {
    const [view, setView] = useState('fullMatch')

    const handleViewChange = (selectedView) => {
        setView(selectedView)
    }

    const getCardStats = (team, type) => {
        const cards = team[`${type}_statistic`]?.cards_statistic
    
        if (!cards) {
            return { yellow: '0.00', red: '0.00' }
        }
    
        switch (view) {
            case 'firstHalf':
                return {
                    yellow: cards.first_half?.yellow_card_first_half || '0.00',
                    red: cards.first_half?.red_card_first_half || '0.00'
                }
            case 'secondHalf':
                return {
                    yellow: cards.second_half?.yellow_card_second_half || '0.00',
                    red: cards.second_half?.red_card_second_half || '0.00'
                }
            case 'fullMatch':
                return {
                    yellow: cards.full_match?.yellow_card_full_match || '0.00',
                    red: cards.full_match?.red_card_full_match || '0.00'
                }
            default:
                return { yellow: '0.00', red: '0.00' }
        }
    }
    
    const homeCardStats = getCardStats(homeTeam, 'home')
    const awayCardStats = getCardStats(awayTeam, 'away')

    return (
        <div className='cards-table'>
            <div className="title">
                <h3 className="heading-tertiary">Probability of Cards</h3>
            </div>
            <div className="buttons">
                <button onClick={() => handleViewChange("firstHalf")} className={view === 'firstHalf' ? 'active' : ''}>
                    First Half
                </button>
                <button onClick={() => handleViewChange("secondtHalf")} className={view === 'secondtHalf' ? 'active' : ''}>
                    Second Half
                </button>
                <button onClick={() => handleViewChange("fullMatch")} className={view === 'fullMatch' ? 'active' : ''}>
                    Full Match
                </button>
            </div>
            <div className="cards-data">
                <div className="team-data">
                    <div className="team-title">
                        <h3 className="heading-tertiary">Home</h3>
                    </div>
                    <div className="team-cards">
                        <span className='card yellow'>{homeCardStats.yellow}</span>
                        <span className='card red'>{homeCardStats.red}</span>
                    </div>
                </div>
                <div className="team-data">
                    <div className="team-title">
                        <h3 className="heading-tertiary">Away</h3>
                    </div>
                    <div className="team-cards">
                        <span className='card red'>{awayCardStats.red}</span>
                        <span className='card yellow'>{awayCardStats.yellow}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
