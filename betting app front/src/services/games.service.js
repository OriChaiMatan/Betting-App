import { httpService } from "./http.service"

export const gamesService = {
    getPastGames,
    getFutureGames,
    getGamesByDate,
    getPastMatchById,
    getFutureMatchById,
    getDefaultFilter,
    getFilterFromParams
}

const FUTURE_BASE_URL = "match/future-match/"
const PAST_BASE_URL = "match/past-match/"

async function getPastGames(filterBy) {
    return await httpService.get(PAST_BASE_URL, filterBy)
}

async function getFutureGames(filterBy) {
    return await httpService.get(FUTURE_BASE_URL, filterBy)
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

function getFilterFromParams(searchParams) {
    const defaultFilter = getDefaultFilter();
    const filterBy = {};
    for (const field in defaultFilter) {
      if (Array.isArray(defaultFilter[field])) {
        filterBy[field] = searchParams.getAll(field) || defaultFilter[field];
      } else {
        filterBy[field] = searchParams.get(field) || defaultFilter[field];
      }
    }
    return filterBy;
  }

function getDefaultFilter() {
    return {
      match_date: "",
      match_league: "",
      match_team: ""
    }
  }