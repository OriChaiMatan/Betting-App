import React from 'react'
import { useState, useEffect } from 'react'
import { utilService } from '../../services/util.service'
import {leaguesService} from '../../services/leagues.service'
import {gamesService} from '../../services/games.service'

export function SoccerIndex() {

    const [leagues, setLeagues] = useState([])
    const [league, setLeague] = useState(null)
    const [pastGames, setPastGames] = useState([])
    const [todayGames, setTodayGames] = useState([])
    const [tomorrowGames, setTomorrowGames] = useState([])
    const [nextTwoDayGames, setNextTwoDayGames] = useState([])
    const LEAGUE_ID = '149'

    useEffect(() => {
        loadLeagues()
        // loadLeague()
        loadPastGames()
        loadTodayGames()
        loadTomorrowGames()
        loadNextTwoDayGames()
    }, [])

    async function loadLeagues() {
        try {
            const leagues = await leaguesService.query()
            setLeagues(leagues)
        } catch (err) {
            console.log('Error in load', err)
        }
    }

    async function loadLeague() {
        try {
            const league = await leaguesService.getLeagueById(LEAGUE_ID)
            setLeague(league)
        } catch (err) {
            console.log('Error in load', err)
        }
    }

    async function loadPastGames() {
        try {
            const pastGamesData = await gamesService.getPastGames() // Fetch past games
            setPastGames(pastGamesData)
        } catch (err) {
            console.log('Error in loading past games', err)
        }
    }

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
            console.log(games)
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

    if (!leagues && !pastGames && !todayGames && !tomorrowGames && !nextTwoDayGames) return <div>No leagues/games available</div>
    return (
        <div>
            <h1>Betting App</h1>
            {/* <h2>Leagues:</h2>
        <pre>{JSON.stringify(leagues, null, 2)}</pre> */}

            {/* <h2>Past Games:</h2>
        <pre>{JSON.stringify(pastGames, null, 2)}</pre> Display past games */}

            <h2>Today's Games:</h2>
            <pre>{JSON.stringify(todayGames, null, 2)}</pre>

            <h2>Tomorrow's Games:</h2>
            <pre>{JSON.stringify(tomorrowGames, null, 2)}</pre>

            <h2>Next Three Days' Games:</h2>
            <pre>{JSON.stringify(nextTwoDayGames, null, 2)}</pre>
        </div>
    )
}
