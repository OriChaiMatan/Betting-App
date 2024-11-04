import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { gamesService } from "../../services/games.service"

export function SoccerFutureMatchDetails() {
    const [match, setMatch] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadMatch()
    }, [params.matchId])

    async function loadMatch() {
        try {
            const match = await gamesService.getFutureMatchById(params.matchId)
            setMatch(match)
        } catch (err) {
            console.log('Error in load past match', err)
        }
    }

    if (!match) return <div>Loading Match Details page...</div>
    return (
        <section className="future-match-details">
            <h3 className='heading-tertiary'>{match.match_hometeam_name}</h3>
            vs
            <h3 className='heading-tertiary'>{match.match_awayteam_name}</h3>
        </section>
    )
}
