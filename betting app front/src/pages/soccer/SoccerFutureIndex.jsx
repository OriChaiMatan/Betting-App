import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

import { loadFutureMatches } from '../../store/actions/future-match.action'

import { utilService } from '../../services/util.service'
import { gamesService } from '../../services/games.service'
import { showErrorMsg } from '../../services/event-bus.service'

import { SoccerFutureMatchesList } from '../../cmps/soccer/future-match/SoccerFutureMatchesList'
import { SkeletonMatchPreview } from '../../cmps/loaders/SkeletonMatchPreview'


export function SoccerFutureIndex() {

    const futureMatches = useSelector((storeState) => storeState.futureMatchModule.futureMatches)
    const [matches, setMatches] = useState([])
    const navigate = useNavigate()
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
        // loadFutureMatches()
        loadTodayGames()
        loadTomorrowGames()
        loadNextTwoDayGames()
        loadFutureGames() // only for development - remove when production!!!!
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
            case 'future': // only for development - remove when production!!!!
                setMatches(matches);
                break;
            default:
                setMatches(tomorrowGames);
                break;
        }
    }, [selectedView, todayGames, tomorrowGames, nextTwoDayGames])

    async function loadFutureGames() {   // only for development - remove when production!!!!
        try {
            await loadFutureMatches()
        } catch (err) {
            console.log('Error in loading today games', err)
            showErrorMsg('Error in fetch Matches, Please try again')
            navigate("/")
        }
    }

    async function loadTodayGames() {
        try {
            const today = utilService.getTodayDate()
            const games = await gamesService.getGamesByDate(today)
            // const games = futureMatches.filter(game => game.match_date === today)
            setTodayGames(games)
        } catch (err) {
            console.log('Error in loading today games', err)
            showErrorMsg('Error in fetch Today Matches, Please try again')
        }
    }

    async function loadTomorrowGames() {
        try {
            const tomorrow = utilService.getNextDate(1)
            const games = await gamesService.getGamesByDate(tomorrow)
            setTomorrowGames(games)
        } catch (err) {
            console.log('Error in loading tomorrow games', err)
            showErrorMsg('Error in fetch Tomorrow Matches, Please try again')
        }
    }

    async function loadNextTwoDayGames() {
        try {
            const nextTwoDays = utilService.getNextDate(2)
            const games = await gamesService.getGamesByDate(nextTwoDays)
            setNextTwoDayGames(games)
        } catch (err) {
            console.log('Error in loading next two day games', err)
            showErrorMsg('Error in fetch Next 2 days Matches, Please try again')
        }
    }

    return (
        <section className='future-match-index'>
            <nav className='match-nav'>
            <button onClick={() => setSelectedView('future')} className={selectedView === 'future' ? 'active' : ''}>future </button>
                <button onClick={() => setSelectedView('today')} className={selectedView === 'today' ? 'active' : ''}>Today <span>{formatDate(today)}</span></button>
                <button onClick={() => setSelectedView('tomorrow')} className={selectedView === 'tomorrow' ? 'active' : ''}>Tomorrow <span>{formatDate(tomorrow)}</span></button>
                <button onClick={() => setSelectedView('nextTwoDays')} className={selectedView === 'nextTwoDays' ? 'active' : ''}>Next 2 Days <span>{formatDate(next2days)}</span></button>
            </nav>
            {matches.length === 0 ? (
                <SkeletonMatchPreview />
            ) : (
                <SoccerFutureMatchesList matches={matches} />
            )}
        </section>
    )
}
