import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { gamesService } from "../../../services/games.service"

export function TeamStatistics({ team }) {
    const [view, setView] = useState('home')
    const [matches, setMatches] = useState([])

    const handleViewChange = (selectedView) => {
        setView(selectedView)
    }

    const fetchMatchDetails = async (matchIds) => {
        const promises = matchIds.map((match) =>
            gamesService.getPastMatchById(match.match_id)
        );
        const results = await Promise.all(promises)
        return results.filter((match) => match !== undefined) // Filter out any undefined results
    }

    useEffect(() => {
        const loadMatches = async () => {
            const matchIds =
                view === "home"
                    ? team.last_5_home_matches
                    : team.last_5_away_matches
            const fetchedMatches = await fetchMatchDetails(matchIds)
            setMatches(fetchedMatches);
        }
        loadMatches()
    }, [view, team])

    const getReadableOutcome = (match, teamId) => {
        if (match.match_hometeam_id === teamId) {
            return match.match_hometeam_score > match.match_awayteam_score
                ? "W"
                : match.match_hometeam_score < match.match_awayteam_score
                ? "L"
                : "D";
        } else {
            return match.match_awayteam_score > match.match_hometeam_score
                ? "W"
                : match.match_awayteam_score < match.match_hometeam_score
                ? "L"
                : "D";
        }
    }

    const currentMatches = view === "home" ? team.last_5_home_matches : team.last_5_away_matches

    if (!team && !matches) return <div>Loading...</div>
    return (
        <div className='team-statistics'>
            <div className="buttons">
                <button onClick={() => handleViewChange("home")} className={view === 'home' ? 'active' : ''}>
                    Home Statistics
                </button>
                <button onClick={() => handleViewChange("away")} className={view === 'away' ? 'active' : ''}>
                    Away Statistics
                </button>
            </div>
            <div className="five-match">
                <h3>
                    Last Matches Results{" "}
                    {view === "home" ? "(Home)" : "(Away)"}
                </h3>
                <div className="outcomes">
                    {matches.length > 0 ? (
                        matches.map((game, idx) => (
                            <Link
                                key={idx}
                                to={`/past-match-details/${game.match_id}`}
                                className="link"
                            >
                                <span
                                    className={`outcome ${getReadableOutcome(
                                        game,
                                        team.team_key
                                    )}`}
                                >
                                    {getReadableOutcome(
                                        game,
                                        team.team_key
                                    )}
                                </span>
                            </Link>
                        ))
                    ) : (
                        <p>Loading match data...</p>
                    )}
                </div>
            </div>
        </div>
    )
}