import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LeaguePreview } from './LeaguePreview'
import { MatchList } from './MatchList'
import { FaHistory } from "react-icons/fa"
import { SkeletonTabelHomePage } from '../../loaders/SkeletonTabelHomePage'
import { SkeletonLeaguePreview } from '../../loaders/SkeletonLeaguePreview'
import Skeleton from 'react-loading-skeleton'


export function LeaguesList({ leagues, matches }) {
    const [selectedLeague, setSelectedLeague] = useState(null)
    const [filteredMatches, setFilteredMatches] = useState([])

    useEffect(() => {
        if (leagues && leagues.length > 0 && !selectedLeague) {
            setSelectedLeague(leagues[0]) // Set the first league as selected
        }
    }, [leagues, selectedLeague])

    const handleLeagueClick = (league) => {
        setSelectedLeague(league)
    }

    useEffect(() => {
        if (selectedLeague) {
            const matchesForLeague = matches.filter((match) => match.league_id === selectedLeague.league_id).slice(-3)
            setFilteredMatches(matchesForLeague)
        } else {
            setFilteredMatches([])
        }
    }, [selectedLeague, matches])

    return (
        <div className='leagues-list'>
            <h1 className="leagues-title">Top Soccer Leagues</h1>
            {leagues.length === 0 ? (
                <SkeletonLeaguePreview cards={7} />
            ) : (
                <div className="leagues-grid">
                    {leagues.map((league) => (
                        <li key={league.league_id} onClick={() => handleLeagueClick(league)}>
                            <LeaguePreview league={league} />
                        </li>
                    ))}
                </div>
            )}
            <div className='league-matches'>
                <div className="title">
                {selectedLeague?.league_name ? <FaHistory className="history-icon" /> : ""}
                    <h3 className='heading-tertiary'>{selectedLeague?.league_name ? `Last ${selectedLeague.league_name} Matches` : <Skeleton />}</h3>
                </div>
                {filteredMatches.length === 0 ? (
                    <SkeletonTabelHomePage />
                ) : (
                    <MatchList matches={filteredMatches} />
                )}
                <div className="navigate-to-match">
                    <Link to={'/past-match'} className='link-to-matches' >
                        <span>All Previous Matches</span>
                    </Link>
                    <Link to={'/future-match'} className='link-to-matches' >
                        <span>All Future Matches</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}