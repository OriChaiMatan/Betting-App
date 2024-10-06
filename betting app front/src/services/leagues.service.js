import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const leaguesService = {
    query,
    getLeagueById
}

const STORAGE_KEY = 'league-data'
// const API_KEY = process.env.REACT_APP_API_KEY;
// const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = '5a4c4911b06bcbb9a47b270e00281deb967823e14191c80de18e46aa36c17960'
const BASE_URL = 'https://apiv3.apifootball.com/'


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

        await Promise.all(leagues.map(async (league) => {
            const teams = await _fetchTeamsByLeagueId(league.league_id)
            league.league_teams = teams
        }))

        return leagues
    } catch (error) {
        console.error('Error fetching leagues data:', error)
        return []
    }
}

async function _fetchTeamsByLeagueId(leagueId) {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: {
                action: 'get_teams',
                league_id: leagueId,
                APIkey: API_KEY
            }
        });
        const teams = Array.isArray(response.data) ? response.data : [] // Get team key
        return teams // Return the array of team keys
    } catch (error) {
        console.error(`Error fetching teams for league ${leagueId}:`, error)
        return []
    }
}