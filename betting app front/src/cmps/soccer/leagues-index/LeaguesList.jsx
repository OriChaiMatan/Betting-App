import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LeaguePreview } from './LeaguePreview'
import { MatchList } from './MatchList'
import { FaHistory } from "react-icons/fa"


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

    if (!leagues || !matches || !selectedLeague) return <div>Loading leagues...</div>
    return (
        <div className='leagues-list'>
            <h1 className="leagues-title">Top Soccer Leagues</h1>
            <div className="leagues-grid">
                {leagues.map((league) => (
                    <li key={league.league_id} onClick={() => handleLeagueClick(league)}>
                        <LeaguePreview league={league} />
                    </li>
                ))}
            </div>
            <div className='league-matches'>
                <div className="title">
                    <FaHistory className="history-icon" />
                    <h3 className='heading-tertiary'>Last {selectedLeague.league_name} Matches</h3>
                </div>
                <MatchList matches={filteredMatches} />
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