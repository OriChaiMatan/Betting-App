import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const gamesService = {
    getPastGames, 
    getFutureGames, 
    getGamesByDate,
    getPastMatchById,
    getFutureMatchById,
    getDefaultFilter
}

const PAST_STORAGE_KEY = 'past-games-data'
const FUTURE_STORAGE_KEY = 'future-games-data'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL

//_createGames()

async function getPastGames() {
    let pastGames = await storageService.query(PAST_STORAGE_KEY)
    return Array.isArray(pastGames) ? pastGames : []
}

async function getFutureGames(filterBy) {
    let futureGames = await storageService.query(FUTURE_STORAGE_KEY)
    futureGames = Array.isArray(futureGames) ? futureGames : []
    if (filterBy?.date) {
        return futureGames.filter(game => game.match_date === filterBy.date);
    }
    return futureGames
}

// Generic function to get games by specific date(s)
async function getGamesByDate(date) {
    const futureGames = await getFutureGames();
    return futureGames.filter(game => game.match_date === date);
}

// function getPastMatchById(matchId) {
//     return storageService.get(PAST_STORAGE_KEY, (match) => match.match_id == matchId)
// }
function getPastMatchById(matchId) {
    return storageService.get(PAST_STORAGE_KEY, (match) => {
        // Convert both to strings to ensure type safety
        return String(match.match_id) === String(matchId);
    });
}


function getFutureMatchById(matchId) {
    return storageService.get(FUTURE_STORAGE_KEY, (match) => match.match_id === matchId)
}

function getDefaultFilter() {
    return {
      match_date: ""
    }
  }

async function _createGames() {
    let pastGames = utilService.loadFromStorage(PAST_STORAGE_KEY)
    let futureGames = utilService.loadFromStorage(FUTURE_STORAGE_KEY)

    if (!pastGames || !pastGames.length) {
        console.log('No past games found, fetching from API...')
        const today = utilService.getTodayDate()
        const pastGames3 = await _fetchGames({ from: '2024-09-10', to: today }) // Adjust date as needed
        const pastGames202 = await _fetchGames({ from: '2024-09-10', to: today, leagueId: '202' }) // Adjust date as needed
        pastGames = [...pastGames3, ...pastGames202]
        utilService.saveToStorage(PAST_STORAGE_KEY, pastGames)
    }

    if (!futureGames || !futureGames.length) {
        console.log('No future games found, fetching from API...')
        const today = utilService.getTodayDate()
        const nextTwoDays = utilService.getNextDate(3)
        //futureGames = await _fetchGames({ from: today, to: nextTwoDays })
        const futureGames1 = await _fetchGames({ from: today, to: '2025-01-01' })
        const futureGames2 = await _fetchGames({ from: today, to: '2025-01-01', leagueId: '202' })
        // futureGames = [...futureGames1, ...futureGames2]
        futureGames = [...(Array.isArray(futureGames1) ? futureGames1 : []), ...(Array.isArray(futureGames2) ? futureGames2 : [])]
        utilService.saveToStorage(FUTURE_STORAGE_KEY, futureGames)
    }
}

async function _fetchGames({ from, to, leagueId = '3' }) {
    try {
        const params = {
            action: 'get_events',
            APIkey: API_KEY,
            from,
            to,
            league_id: leagueId  // delete when production
        }
        const { data } = await axios.get(BASE_URL, { params })
        return data
    } catch (error) {
        console.error('Error fetching games:', error)
        return []
    }
}