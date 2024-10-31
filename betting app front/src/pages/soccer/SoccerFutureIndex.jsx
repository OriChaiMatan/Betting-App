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
    const [selectedView, setSelectedView] = useState('today');

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
                <button onClick={() => setSelectedView('today')} className={selectedView === 'today' ? 'active' : ''}>Today</button>
                <button onClick={() => setSelectedView('tomorrow')} className={selectedView === 'tomorrow' ? 'active' : ''}>Tomorrow</button>
                <button onClick={() => setSelectedView('nextTwoDays')} className={selectedView === 'nextTwoDays' ? 'active' : ''}>Next 3 Days</button>
            </nav>
            {matches.length === 0 ? (
                <div>No future games available</div>
            ) : (
                <SoccerFutureMatchesList matches={matches} />
            )}
        </section>
    )
}
