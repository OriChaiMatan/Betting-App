import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { gamesService } from "../../../services/games.service"

export function TeamStatistics({ team }) {
    const [view, setView] = useState('home')
    const [matches, setMatches] = useState([])

    const handleViewChange = (selectedView) => {
        setView(selectedView)
    }

    // const fetchMatchDetails = async (matchIds) => {
    //     console.log("Match IDs:", matchIds);
    //     const promises = matchIds.map((match) =>
    //         gamesService.getPastMatchById(match.match_id)
    //     );
    //     const results = await Promise.all(promises)
    //     return results.filter((match) => match !== undefined) // Filter out any undefined results
    // }
    const fetchMatchDetails = async (matchIds) => {
        const promises = matchIds.map(async (match) => {
            try {
                const result = await gamesService.getPastMatchById(match.match_id);
                return result || null; // Ensure a null or fallback is returned
            } catch (error) {
                console.error(`Failed to fetch match ${match.match_id}:`, error);
                return null;
            }
        });
        const results = await Promise.all(promises);
        return results.filter((match) => match !== null); // Filter out any null results
    };


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

    const currentStatistics = view === "home" ? team.home_statistic : team.away_statistic

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
                    {view === "home" ? "- Home" : "- Away"}
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
            <div className="win-draw-lose">
                <h3>
                    {view === "home" ? "Home" : "Away"} Probability of Match Outcome
                </h3>
                <div className="statistics">
                    <div>
                        <span>Win <a>{currentStatistics.win_percentage}%</a></span> 
                    </div>
                    <div>
                        <span>Draw <a>{currentStatistics.draw_percentage}%</a></span>
                    </div>
                    <div>
                        <span>Loss <a>{currentStatistics.loss_percentage}%</a></span>
                    </div>
                </div>
            </div>
            <div className="avg-goal">
                <h3>
                    Average Goals per Match {view === "home" ? "- Home" : "- Away"}
                </h3>
                <div className="goals">
                    <div className="info">
                        <span>{currentStatistics.avg_goals_full_match} - Goals per Full Match </span>
                    </div>
                    <div className="info">
                        <span>{currentStatistics.avg_goals_first_half} - Goals per First Half</span>
                    </div>
                </div>
            </div>
            <div className="cards">
                <h3>
                    Average Cards per Match {view === "home" ? "- Home" : "- Away"}
                </h3>
                <div className="team-cards"> 
                    <span className='card yellow'>{currentStatistics.cards_statistic.full_match.yellow_card_full_match}</span>
                    <span className='card red'>{currentStatistics.cards_statistic.full_match.red_card_full_match}</span>
                </div>
            </div>
        </div>
    )
}