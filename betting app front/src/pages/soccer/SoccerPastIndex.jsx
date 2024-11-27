import { useState, useEffect } from 'react'
import {gamesService} from '../../services/games.service'
import { SoccerPastMatchesList } from '../../cmps/soccer/past-match/SoccerPastMatchesList'

export function SoccerPastIndex() {
    const [pastGames, setPastGames] = useState([])

    useEffect(() => {
        loadPastGames()
    }, [])

    async function loadPastGames() {
        try {
            const pastGamesData = await gamesService.getPastGames() // Fetch past games
            setPastGames(pastGamesData)
        } catch (err) {
            console.log('Error in loading past games', err)
        }
    }

    return (
        <section className='past-match-index'>
            <SoccerPastMatchesList matches={pastGames.slice(-15)} />
        </section>
    )
}
