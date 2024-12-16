import { httpService } from "./http.service"

export const leaguesService = {
    query,
    getLeagueById,
    getTeamByLeagueAndTeamId,
    getTeamById
}

const BASE_URL = "league/"

async function query() {
    return await httpService.get(BASE_URL)
}

async function getLeagueById(leagueId) {
    const league = await httpService.get(`${BASE_URL}${leagueId}`)
    return league
}

async function getTeamByLeagueAndTeamId(leagueId, teamId) {
    try {
        const team = await httpService.get(`${BASE_URL}${leagueId}/${teamId}`)
        return team
    } catch (err) {
        console.error(`Failed to fetch team with ID ${teamId} from league ${leagueId}`, err)
        throw err
    }
}

async function getTeamById(teamId) {
    try {
        const leagues = await query() // Get all leagues
        for (const league of leagues) {
            const team = league.league_teams?.find(team => team.team_key === teamId)
            if (team) return team
        }
        throw new Error(`Team with ID ${teamId} not found in any league`)
    } catch (err) {
        console.error(`Failed to fetch team with ID ${teamId}`, err)
        throw err
    }
}