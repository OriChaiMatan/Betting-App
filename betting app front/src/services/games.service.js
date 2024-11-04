import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const gamesService = {
    getPastGames, 
    getFutureGames, 
    getGamesByDate,
    getPastMatchById
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

async function getFutureGames() {
    let futureGames = await storageService.query(FUTURE_STORAGE_KEY);
    return Array.isArray(futureGames) ? futureGames : [];
}

// Generic function to get games by specific date(s)
async function getGamesByDate(date) {
    const futureGames = await getFutureGames();
    return futureGames.filter(game => game.match_date === date);
}

function getPastMatchById(id) {
    return storageService.get(PAST_STORAGE_KEY, id)
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