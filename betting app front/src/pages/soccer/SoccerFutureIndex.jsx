import React from 'react'
import { useState, useEffect } from 'react'
import { utilService } from '../../services/util.service'
import {gamesService} from '../../services/games.service'
import { SoccerFutureMatchesList } from '../../cmps/soccer/SoccerFutureMatchesList'

export function SoccerFutureIndex() {

    const [todayGames, setTodayGames] = useState([])
    const [tomorrowGames, setTomorrowGames] = useState([])
    const [nextTwoDayGames, setNextTwoDayGames] = useState([])

    useEffect(() => {
        loadTodayGames()
        loadTomorrowGames()
        loadNextTwoDayGames()
    }, [])

    async function loadTodayGames() {
        try {
            const today = utilService.getTodayDate()
            const games = await gamesService.getGamesByDate(today)
            setTodayGames(games)
        } catch (err) {
            console.log('Error in loading today games', err)
        }
    }

    async function loadTomorrowGames() {
        try {
            const tomorrow = utilService.getNextDate(1)
            const games = await gamesService.getGamesByDate(tomorrow)
            setTomorrowGames(games)
        } catch (err) {
            console.log('Error in loading tomorrow games', err)
        }
    }

    async function loadNextTwoDayGames() {
        try {
            const nextTwoDays = utilService.getNextDate(2)
            const games = await gamesService.getGamesByDate(nextTwoDays)
            setNextTwoDayGames(games)
        } catch (err) {
            console.log('Error in loading next two day games', err)
        }
    }

    if (tomorrowGames.length === 0) return <div>No future games available</div>
    return (
        <section className='soccer-index'>
            <SoccerFutureMatchesList matches={tomorrowGames} />
        </section>
    )
}
