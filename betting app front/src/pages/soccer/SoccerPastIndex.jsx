import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import {gamesService} from '../../services/games.service'
import { SoccerPastMatchesList } from '../../cmps/soccer/past-match/SoccerPastMatchesList'
import { SkeletonMatchPreview } from '../../cmps/loaders/SkeletonMatchPreview'
import { showErrorMsg } from '../../services/event-bus.service'

export function SoccerPastIndex() {
    const [pastGames, setPastGames] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        loadPastGames()
    }, [])

    async function loadPastGames() {
        try {
            const pastGamesData = await gamesService.getPastGames() // Fetch past games
            setPastGames(pastGamesData)
        } catch (err) {
            console.log('Error in loading past games', err)
            showErrorMsg('Error in fetch Previous Matches, Please try again')
            navigate("/")
        }
    }

    return (
        <section className='past-match-index'>
            {pastGames.length === 0 ? (
                <SkeletonMatchPreview />
            ) : (
                <SoccerPastMatchesList matches={pastGames.slice(-15)} />
            )}
        </section>
    )
}
