import { useState, useEffect } from 'react'
import { PastMatchTableList } from './PastMatchTableList' 
import { Link } from 'react-router-dom'
import { FaHistory } from "react-icons/fa"
import { SkeletonTabelHomePage } from '../../loaders/SkeletonTabelHomePage'

export function PastMatchTable({ matches }) {

    const finishedMatches = matches.filter(match => match.match_status === "Finished").slice(-5);

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
            {matches.length === 0 ? (
                <SkeletonTabelHomePage />
            ) : (
                <PastMatchTableList matches={finishedMatches} />
            )}
            <Link to={'/past-match'} className='link-to-matches' >
                <span>All Previous Matches Here !</span>
            </Link>
        </div>
    )
}