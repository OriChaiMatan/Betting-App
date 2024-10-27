import React from 'react'
import { useState, useEffect } from 'react'
import { utilService } from '../../services/util.service'
import {leaguesService} from '../../services/leagues.service'
import {gamesService} from '../../services/games.service'
import { SoccerMatchesList } from '../../cmps/soccer/SoccerMatchesList'

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

    return (
        <section className='soccer-index'>
            <SoccerMatchesList matches={pastGames.slice(-15)} />
        </section>
    )
}
