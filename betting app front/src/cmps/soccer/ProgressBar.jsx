import React from 'react'

export function ProgressBar({ homeTaemData, awayTeamData }) {
    const totalScore = parseInt(homeTaemData) + parseInt(awayTeamData);
    const homePercentage = ((parseInt(homeTaemData) / totalScore) * 100).toFixed(1);
    const awayPercentage = (100 - homePercentage).toFixed(1);

    return (
        <div className="score-progress-bar">
            <div className="team home" style={{ width: `${homePercentage}%` }}>
                <span>{homePercentage}%</span>
            </div>
            <div className="team away" style={{ width: `${awayPercentage}%` }}>
                <span>{awayPercentage}%</span>
            </div>
        </div>
    )
}