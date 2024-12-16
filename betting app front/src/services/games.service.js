import { httpService } from "./http.service"

export const gamesService = {
    getPastGames,
    getFutureGames,
    getGamesByDate,
    getPastMatchById,
    getFutureMatchById,
    getDefaultFilter
}

const FUTURE_BASE_URL = "match/future-match/"
const PAST_BASE_URL = "match/past-match/"

async function getPastGames() {
    return await httpService.get(PAST_BASE_URL)
}

async function getFutureGames() {
    return await httpService.get(FUTURE_BASE_URL)
}

async function getGamesByDate(date) {
    const futureGames = await httpService.get(FUTURE_BASE_URL)
    return futureGames.filter(game => game.match_date == date)
}

async function getPastMatchById(matchId) {
    const match = await httpService.get(`${PAST_BASE_URL}${matchId}`)
    return match
}

async function getFutureMatchById(matchId) {
    console.log(matchId)
    const match = await httpService.get(`${FUTURE_BASE_URL}${matchId}`)
    return match
}

function getDefaultFilter() {
    return {
      match_date: ""
    }
  }