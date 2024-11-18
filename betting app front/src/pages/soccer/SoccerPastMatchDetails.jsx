import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { gamesService } from "../../services/games.service"
import { ScoreTable } from "../../cmps/soccer/past-match/ScoreTable"
import { StickyHeader } from "../../cmps/soccer/StickyHeader"
import { CallToActionHeader } from "../../cmps/soccer/future-match/CallToActionHeader"

export function SoccerPastMatchDetails() {
    const [match, setMatch] = useState(null)
    const [isSticky, setIsSticky] = useState(false)
    const params = useParams()

    useEffect(() => {
        loadMatch()
    }, [params.matchId])

    const handleScroll = () => {
        const scrollPosition = window.scrollY
        const viewportHeight = window.innerHeight
        const threshold = viewportHeight * 0.2  // 20% of viewport height

        setIsSticky(scrollPosition > threshold)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    async function loadMatch() {
        try {
            const match = await gamesService.getPastMatchById(params.matchId)
            setMatch(match)
        } catch (err) {
            console.log('Error in load past match', err)
        }
    }

    if (!match) return <div>Loading Match Details page...</div>
    return (
        <>
            {isSticky && <StickyHeader match={match} />}
            <section className="past-match-details">
                <div className="call-to-action-header"><CallToActionHeader /></div>
                <div className='league-data'>
                    <img src={match.league_logo} alt="League Logo" />
                    <div className="league-info">
                        <h3 className='heading-tertiary'>{match.league_name}</h3>
                        <span>Season: {match.league_year}</span>
                    </div>
                </div>
                <div className="teams-data">
                    <div className='team-preview'>
                        <img src={match.team_home_badge} alt="Home team badge" />
                        <span>Home Team</span>
                        <h3 className='heading-tertiary'>{match.match_hometeam_name}</h3>
                    </div>
                    <div className='score-preview'>
                        <h2 className='heading-secondary'>{match.match_hometeam_score} : {match.match_awayteam_score}</h2>
                    </div>
                    <div className='team-preview'>
                        <img src={match.team_away_badge} alt="Home team badge" />
                        <span>Away Team</span>
                        <h3 className='heading-tertiary'>{match.match_awayteam_name}</h3>
                    </div>
                </div>
                <div className="statistic-data">
                    <ScoreTable match={match} />
                </div>
            </section>
        </>
    )
}