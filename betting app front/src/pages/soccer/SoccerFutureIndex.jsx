import React from 'react'
import { useState, useEffect } from 'react'
import { utilService } from '../../services/util.service'
import { gamesService } from '../../services/games.service'
import { SoccerFutureMatchesList } from '../../cmps/soccer/future-match/SoccerFutureMatchesList'

export function SoccerFutureIndex() {

    const [matches, setMatches] = useState([])

    const [todayGames, setTodayGames] = useState([])
    const [tomorrowGames, setTomorrowGames] = useState([])
    const [nextTwoDayGames, setNextTwoDayGames] = useState([])
    const [selectedView, setSelectedView] = useState('today')

    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const next2days = new Date(today)
    next2days.setDate(today.getDate() + 2)
    const formatDate = (date) => date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })

    useEffect(() => {
        loadTodayGames()
        loadTomorrowGames()
        loadNextTwoDayGames()
    }, [])

    useEffect(() => {
        switch (selectedView) {
            case 'today':
                setMatches(todayGames);
                break;
            case 'tomorrow':
                setMatches(tomorrowGames);
                break;
            case 'nextTwoDays':
                setMatches(nextTwoDayGames);
                break;
            default:
                setMatches(tomorrowGames);
                break;
        }
    }, [selectedView, todayGames, tomorrowGames, nextTwoDayGames])

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
        <section className='future-match-index'>
            <nav className='match-nav'>
                <button onClick={() => setSelectedView('today')} className={selectedView === 'today' ? 'active' : ''}>Today <span>{formatDate(today)}</span></button>
                <button onClick={() => setSelectedView('tomorrow')} className={selectedView === 'tomorrow' ? 'active' : ''}>Tomorrow <span>{formatDate(tomorrow)}</span></button>
                <button onClick={() => setSelectedView('nextTwoDays')} className={selectedView === 'nextTwoDays' ? 'active' : ''}>Next 2 Days <span>{formatDate(next2days)}</span></button>
            </nav>
            {matches.length === 0 ? (
                <div>No future games available</div>
            ) : (
                <SoccerFutureMatchesList matches={matches} />
            )}
        </section>
    )
}