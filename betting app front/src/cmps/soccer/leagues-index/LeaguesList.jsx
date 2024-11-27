import { useState, useEffect } from 'react'
import { LeaguePreview } from './LeaguePreview'
import { MatchList } from './MatchList'

export function LeaguesList({ leagues, matches }) {
    const [selectedLeague, setSelectedLeague] = useState(null)
    const [filteredMatches, setFilteredMatches] = useState([])

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

    if (!leagues || !matches) return <div>Loading leagues...</div>
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
            <MatchList matches={filteredMatches} />
        </div>
    )
}