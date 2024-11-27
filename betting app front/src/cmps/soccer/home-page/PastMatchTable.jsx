import React from 'react'
import { PastMatchTableList } from './PastMatchTableList' 
import { Link } from 'react-router-dom'
import { FaHistory } from "react-icons/fa"

export function PastMatchTable({ matches }) {
    return (
        <div className='match-past-table'>
            <div className="title">
                <FaHistory className="history-icon" />
                <h3 className='heading-tertiary'>Last Matches</h3>
            </div>
            <div className="league-filter">     {/* When get all data- build the filter by leagues */}
                <button className='league-btn'>Today</button>
                <button className='league-btn'>League 1</button>
                <button className='league-btn'>League 2</button>
                <button className='league-btn'>League 3</button>
                <button className='league-btn'>League 4</button>
            </div>
            <PastMatchTableList matches={matches.slice(-5)} />
            <Link to={'/past-match'} className='link-to-matches' >
                <span>All Previous Matches Here !</span>
            </Link>
        </div>
    )
}