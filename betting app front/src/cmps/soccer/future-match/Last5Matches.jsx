import { Link } from 'react-router-dom';

export function Last5Matches({ homeLast5Games, awayLast5Games, homeTeam, awayTeam, getReadableOutcome }) {
    return (
        <div className="last-5-match">
            <div className="header">
                <h2>Last 5 Matches History</h2>
            </div>
            <div className="teams">
                <div className="team-last-5">
                    <div className="team-data">
                        <img src={homeTeam.team_badge} alt="Home team badge" />
                        <h3>{homeTeam.team_name}</h3>
                    </div>
                    <div className="outcomes">
                        {homeLast5Games.map((game, idx) => (
                            <Link key={idx} to={`/past-match-details/${game.match_id}`} className="link">
                                <span className={`outcome ${getReadableOutcome(game, homeTeam.team_key)}`}>
                                    {getReadableOutcome(game, homeTeam.team_key)}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="team-last-5">
                    <div className="team-data">
                        <img src={awayTeam.team_badge} alt="Away team badge" />
                        <h3>{awayTeam.team_name}</h3>
                    </div>
                    <div className="outcomes">
                        {awayLast5Games.map((game, idx) => (
                            <Link key={idx} to={`/past-match-details/${game.match_id}`} className="link">
                                <span className={`outcome ${getReadableOutcome(game, awayTeam.team_key)}`}>
                                    {getReadableOutcome(game, awayTeam.team_key)}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
