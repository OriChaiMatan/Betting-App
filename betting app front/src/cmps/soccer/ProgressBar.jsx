import React from 'react'

export function ProgressBar({ homeTaemData, awayTeamData }) {
    const totalScore = parseInt(homeTaemData) + parseInt(awayTeamData);
    const homePercentage = totalScore === 0 ? 50 : ((parseInt(homeTaemData) / totalScore) * 100).toFixed(1);
    const awayPercentage = totalScore === 0 ? 50 : (100 - homePercentage).toFixed(1);

    return (
        <div className='progress-bar-container'>
            <div className="score-progress-bar">
                <div className="team home" style={{ width: `${homePercentage}%` }}>
                </div>
                <div className="team away" style={{ width: `${awayPercentage}%` }}>
                </div>
            </div>
        </div>
    )
}