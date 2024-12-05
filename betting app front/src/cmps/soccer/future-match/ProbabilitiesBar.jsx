import React from 'react'

export function ProbabilitiesBar({ odds }) {

    const calculateNormalizedProbabilities = (odds) => {
        if (!odds || odds.odd_1 === 'N/A' || odds.odd_x === 'N/A' || odds.odd_2 === 'N/A') {
            return { homeWin: 'N/A', draw: 'N/A', awayWin: 'N/A' }
        }

        const probHomeWin = 1 / parseFloat(odds.odd_1)
        const probDraw = 1 / parseFloat(odds.odd_x)
        const probAwayWin = 1 / parseFloat(odds.odd_2)

        const total = probHomeWin + probDraw + probAwayWin

        const homeWin = ((probHomeWin / total) * 100).toFixed(1)
        const draw = ((probDraw / total) * 100).toFixed(1)
        const awayWin = ((probAwayWin / total) * 100).toFixed(1)

        return { homeWin, draw, awayWin }
    }

    const oddsProbabilities = odds ? calculateNormalizedProbabilities(odds) : null

    return (
        <div className="probabilities-bar">
            <div className='title'>
                <h3 className='heading-tertiary'>Probability of Winning</h3>
            </div>

            {oddsProbabilities ? (
                <div className='odds-data'>
                    <div className="labels">
                        <h3 className='heading-tertiary'>Home</h3>
                        <h3 className='heading-tertiary'>Draw</h3>
                        <h3 className='heading-tertiary'>Away</h3>
                    </div>
                    <div className='odds-1x2'>
                        <span><a>{odds ? odds.odd_1 : 'Loading...'}</a></span>
                        <span><a>{odds ? odds.odd_x : 'Loading...'}</a></span>
                        <span><a>{odds ? odds.odd_2 : 'Loading...'}</a></span>
                    </div>
                    <div className="progress-bar-container">
                        <div
                            className="progress-segment home"
                            style={{ width: `${oddsProbabilities.homeWin}%` }}
                            title={`Home ${oddsProbabilities.homeWin}%`}
                        >Home {oddsProbabilities.homeWin}%</div>
                        <div
                            className="progress-segment draw"
                            style={{ width: `${oddsProbabilities.draw}%` }}
                            title={`Draw ${oddsProbabilities.draw}%`}
                        >Draw {oddsProbabilities.draw}%</div>
                        <div
                            className="progress-segment away"
                            style={{ width: `${oddsProbabilities.awayWin}%` }}
                            title={`Away ${oddsProbabilities.awayWin}%`}
                        >{oddsProbabilities.awayWin}% Away</div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
            <p>By Top 10 Bookmakers odds</p>
        </div>
    )
}
