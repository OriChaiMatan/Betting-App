import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { gamesService } from "../../services/games.service";

export function SoccerPastMatchDetails() {
    const [match, setMatch] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadMatch()
    }, [params.matchId])

    async function loadMatch() {
        try {
            const match = await gamesService.getPastMatchById(params.matchId)
            setMatch(match)
        } catch (err) {
            console.log('Error in load past match', err)
        }
    }

    if (!match) return <div>Loading Match Deatails page.</div>
    return (
            <section className="past-match-details">
                <div>SoccerPastMatchDetails</div>
                <h3>{match.match_id}</h3>
                <Link to={'/'} className="link"><a className="btn-text">Back to Past Games</a></Link>
            </section>
    )
}