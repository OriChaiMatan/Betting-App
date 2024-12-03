import React from 'react'
import { FutureMatchTableList } from './FutureMatchTableList'
import { Link } from 'react-router-dom'
import { FaCrown } from "react-icons/fa"
import { SkeletonTabelHomePage } from '../../loaders/SkeletonTabelHomePage'

export function FutureMatchTable({ matches }) {

    if (!matches || matches.length === 0) {
        return <SkeletonTabelHomePage />
    }
    return (
        <div className='match-future-table'>
            <div className="title">
                <FaCrown className="crown-icon" />
                <h3 className='heading-tertiary'>Top Future Matches</h3>
            </div>
            <div className="league-filter">     {/* When get all data- build the filter by leagues */}
                <button className='league-btn'>Today</button>
                <button className='league-btn'>League 1</button>
                <button className='league-btn'>League 2</button>
                <button className='league-btn'>League 3</button>
                <button className='league-btn'>League 4</button>
            </div>
            <FutureMatchTableList matches={matches.slice(0, 3)} />
            <Link to={'/future-match'} className='link-to-matches' >
                <span>All Future Matches Here !</span>
            </Link>
        </div>
    )
}