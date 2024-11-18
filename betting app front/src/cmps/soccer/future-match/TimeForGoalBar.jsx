import { useState } from "react"

export function TimeForGoalBar({homeGoalIntervals, awayGoalIntervals}) {
    const [view, setView] = useState('home')

    const handleViewChange = (selectedView) => {
        setView(selectedView)
    }

    const goalIntervals = view === "home" ? homeGoalIntervals : awayGoalIntervals;

    // Calculate the total number of goals
    const totalGoals = Object.values(goalIntervals).reduce((sum, goals) => sum + goals, 0);

    // Calculate the percentage for each interval
    const goalPercentages = Object.keys(goalIntervals).reduce((percentages, interval) => {
        const goals = goalIntervals[interval];
        percentages[interval] = totalGoals > 0 ? ((goals / totalGoals) * 100).toFixed(2) : 0;
        return percentages;
    }, {})

    return (
        <div className='goals-container'>
            <div className="title">
                <h3 className="heading-tertiary">Goal Chance Per Minute</h3>
            </div>
            <div className="buttons">
                <button onClick={() => handleViewChange("home")} className={view === 'home' ? 'active' : ''}>
                    Home
                </button>
                <button onClick={() => handleViewChange("away")} className={view === 'away' ? 'active' : ''}>
                    Away
                </button>
            </div>
            <div className="goals-table">
                <div className='body'>
                    <div className='bar'>
                        {Object.keys(goalIntervals).map((interval) => (
                            <span key={interval}>{goalPercentages[interval]}%</span>
                        ))}
                    </div>
                    <div className='minutes'>
                        <span>0 - 15 mins</span>
                        <span>16 - 30 mins</span>
                        <span>31 - 45 mins</span>
                        <span>46 - 60 mins</span>
                        <span>61 - 75 mins</span>
                        <span>76 - 90 mins</span>
                    </div>
                </div>
            </div>
        </div>
    )
}