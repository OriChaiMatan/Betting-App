import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link, useNavigate } from "react-router-dom"
import { gamesService } from "../../services/games.service"
import { utilService } from "../../services/util.service"
import { ScoreTable } from "../../cmps/soccer/past-match/ScoreTable"
import { StickyHeader } from "../../cmps/soccer/StickyHeader"
import { CallToActionHeader } from "../../cmps/soccer/future-match/CallToActionHeader"
import { MatchSummary } from "../../cmps/soccer/past-match/MatchSummary"
import { SkeletonPastMatchDetails } from "../../cmps/loaders/SkeletonPastMatchDetails"
import { MdOutlinePlace } from "react-icons/md"


export function SoccerPastMatchDetails() {
    const [match, setMatch] = useState(null)
    const [isSticky, setIsSticky] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

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
            showErrorMsg('Error in fetch Previous Match, Please try again')
            navigate("/past-match")
        }
    }

    if (!match) return <SkeletonPastMatchDetails />
    return (
        <>
            {isSticky && <StickyHeader match={match} />}
            <section className="past-match-details">
                <div className="call-to-action-header"><CallToActionHeader /></div>
                <Link to={`/league-details/${match.league_id}`} className="link">
                    <div className='league-data'>
                        <img src={match.league_logo} alt="League Logo" />
                        <div className="league-info">
                            <h3 className='heading-tertiary'>{match.league_name}</h3>
                            <span>Season: {match.league_year}</span>
                        </div>
                    </div>
                </Link>
                <div className="teams-data">
                    <Link to={`/team-details/${match.league_id}/${match.match_hometeam_id}`} className="link">
                        <div className='team-preview'>
                            <img src={match.team_home_badge} alt="Home team badge" />
                            <span>Home Team</span>
                            <h3 className='heading-tertiary'>{match.match_hometeam_name}</h3>
                        </div>
                    </ Link>
                    <div className='score-preview'>
                        <h2 className='heading-secondary'>{match.match_hometeam_score} : {match.match_awayteam_score}</h2>
                    </div>
                    <Link to={`/team-details/${match.league_id}/${match.match_awayteam_id}`} className="link">
                        <div className='team-preview'>
                            <img src={match.team_away_badge} alt="Home team badge" />
                            <span>Away Team</span>
                            <h3 className='heading-tertiary'>{match.match_awayteam_name}</h3>
                        </div>
                    </Link>
                </div>
                <div className="place-data">
                    <div className="stadium">
                        <MdOutlinePlace />
                        <h3 className="heading-tertiary">{match.match_stadium}</h3>
                    </div>
                    <div className="date">
                        <h3 className='heading-tertiary'>{match.match_time}</h3>
                        <h3 className='heading-tertiary'>{utilService.formatDate(match.match_date)}</h3>
                    </div>
                </div>
                <div className="statistic-data">
                    <MatchSummary match={match} />
                    <ScoreTable match={match} />
                </div>
            </section>
        </>
    )
}