import React from 'react'

export function TimeForGoalBar() {
    return (
        <div className='goals-container'>
            <div className="title">
                <h3 className="heading-tertiary">Goal Chance Per Minute</h3>
            </div>
            <div className="goals-table">
                <div className='body'>
                    <div className='bar'>
                        <span>0.87%</span>
                        <span>11.28%</span>
                        <span>39.43%</span>
                        <span>16.44%</span>
                        <span>4.83%</span>
                        <span>22.55%</span>
                    </div>
                    <div className='minutes'>
                        <span>0 - 15</span>
                        <span>16 - 30</span>
                        <span>31 - 45</span>
                        <span>46 - 60</span>
                        <span>61 - 75</span>
                        <span>76 - 90</span>
                    </div>
                </div>
            </div>
        </div>
    )
}