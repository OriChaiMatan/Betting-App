import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { utilService } from '../../../services/util.service'
import { RxCross1 } from "react-icons/rx"
import axios from 'axios'

export function MatchPreview({ match }) {
    const [odds, setOdds] = useState(null)

    const API_KEY = import.meta.env.VITE_API_KEY
    const BASE_URL = import.meta.env.VITE_BASE_URL

    useEffect(() => {
        async function fetchOdds() {
            if (!match) return  // Ensure match is loaded
            try {
                const response = await axios.get(`${BASE_URL}`, {
                    params: {
                        action: 'get_odds',
                        match_id: match.match_id,
                        APIkey: API_KEY
                    }
                })
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const oddsData = response.data
                    const averageOdds = calculateAverageOdds(oddsData)
                    setOdds(averageOdds)
                } else {
                    console.warn('No odds data available for match:', match.match_id);
                    setOdds({ odd_1: 'N/A', odd_x: 'N/A', odd_2: 'N/A' })
                }
            } catch (error) {
                console.error('Error fetching odds:', error)
                setOdds({ odd_1: 'N/A', odd_x: 'N/A', odd_2: 'N/A' })
            }
        }
        if (match) fetchOdds()
    }, [match])

    const calculateAverageOdds = (oddsList) => {
        if (!oddsList || oddsList.length === 0) return { odd_1: 'N/A', odd_x: 'N/A', odd_2: 'N/A' }

        let totalHome = 0, totalDraw = 0, totalAway = 0
        let count = oddsList.length

        oddsList.forEach(odds => {
            totalHome += parseFloat(odds.odd_1)
            totalDraw += parseFloat(odds.odd_x)
            totalAway += parseFloat(odds.odd_2)
        })

        return {
            odd_1: (totalHome / count).toFixed(2),
            odd_x: (totalDraw / count).toFixed(2),
            odd_2: (totalAway / count).toFixed(2),
        }
    }

    return (
        <section className='match-preview'>
            <Link to={`/future-match-details/${match.match_id}`} className='link'>
                <div className='match-data-preview'>
                    <div className='league-data-preview'>
                        <img src={match.league_logo} alt="League Logo" />
                        <span>{match.league_name}</span>
                    </div>
                    <div className='match-date'>
                        <span>{match.match_time}</span>
                        <span>{utilService.formatDate(match.match_date)}</span>
                    </div>
                </div>
                <div className='teams-data-preview'>
                    <div className='team-preview left'>  {/* On click navigate to team page */}
                        <img src={match.team_home_badge} alt="Home team badge" />
                        <h3 className='heading-tertiary'>{match.match_hometeam_name}</h3>
                    </div>
                    <div className='vs'>
                        <span>VS</span>
                    </div>
                    <div className='team-preview right'>  {/* On click navigate to team page */}
                        <img src={match.team_away_badge} alt="Home team badge" />
                        <h3 className='heading-tertiary'>{match.match_awayteam_name}</h3>
                    </div>
                </div>
                <div className='odds-1x2'> {/* Option for future- when click on odds option it will take the user to affiliate site ????? */}
                    <span><div>1</div>  {odds ? odds.odd_1 : 'Loading...'}</span>
                    <span><RxCross1 /> {odds ? odds.odd_x : 'Loading...'}</span>
                    <span><div>2</div>   {odds ? odds.odd_2 : 'Loading...'}</span>
                </div>
            </Link>
        </section>
    )
}