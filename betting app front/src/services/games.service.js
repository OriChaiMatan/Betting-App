import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

// Game service will give the option to see past games and future games and after that filter it:
// games-data: [
//               pastGames[games...],
//               futureGames:[3 days ahead]
//              ]

export const gamesService = {
    getPastGames,  
    getTodayGames,
    getTomorrowGames,
    getNextTwoDayGames
}

const PAST_STORAGE_KEY = 'past-games-data'
const FUTURE_STORAGE_KEY = 'future-games-data'
const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL

_createGames()

async function getPastGames() {
    let pastGames = await storageService.query(PAST_STORAGE_KEY)
    return Array.isArray(pastGames) ? pastGames : []
}

async function getTodayGames() {
    let todayGames = await storageService.query(FUTURE_STORAGE_KEY)
    return todayGames.filter(game => game.match_date === utilService.getTodayDate())
}

async function getTomorrowGames() {
    let tomorrowGames = await storageService.query(FUTURE_STORAGE_KEY)
    return tomorrowGames.filter(game => game.match_date === utilService.getNextDate(1))
}

async function getNextTwoDayGames() {
    let nextTwoDaysGames = await storageService.query(FUTURE_STORAGE_KEY)
    return nextTwoDaysGames.filter(game => game.match_date === utilService.getNextDate(2))
}

async function _createGames() {
    let pastGames = utilService.loadFromStorage(PAST_STORAGE_KEY)
    let futureGames = utilService.loadFromStorage(FUTURE_STORAGE_KEY)

    if (!pastGames || !pastGames.length) {
        console.log('No past games found, fetching from API...')
        const today = utilService.getTodayDate()
        pastGames = await _fetchGames({ from: '2024-08-01', to: today }) // Adjust date as needed
        utilService.saveToStorage(PAST_STORAGE_KEY, pastGames)
    }

    if (!futureGames || !futureGames.length) {
        console.log('No future games found, fetching from API...')
        const today = utilService.getTodayDate()
        const nextTwoDays = utilService.getNextDate(3)
        futureGames = await _fetchGames({ from: today, to: nextTwoDays })
        utilService.saveToStorage(FUTURE_STORAGE_KEY, futureGames)
    }
}

async function _fetchGames({ from, to }) {
    try {
        const params = {
            action: 'get_events',
            APIkey: API_KEY,
            from,
            to
        }
        const { data } = await axios.get(BASE_URL, { params })
        return data
    } catch (error) {
        console.error('Error fetching games:', error)
        return []
    }
}