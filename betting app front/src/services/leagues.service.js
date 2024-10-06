import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const leaguesService = {
    query,
    getLeagueById
}

const STORAGE_KEY = 'league-data'
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;


_createLeagues()

async function query() {
    let leagues = await storageService.query(STORAGE_KEY)
    return Array.isArray(leagues) ? leagues : []
}

function getLeagueById(leagueId) {
    return storageService.get(STORAGE_KEY, leagueId)
}

async function _createLeagues() {
    let leagues = utilService.loadFromStorage(STORAGE_KEY)
    if (!leagues || !leagues.length) {
        leagues = await _fetchLeagues()
        utilService.saveToStorage(STORAGE_KEY, leagues)
    }
}

async function _fetchLeagues() {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: {
                action: 'get_leagues',
                APIkey: API_KEY
            }
        })
        const leagues = Array.isArray(response.data) ? response.data : []
        return leagues
    } catch (error) {
        console.error('Error fetching leagues data:', error)
        return []
    }
}