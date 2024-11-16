import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { gamesService } from './games.service.js'

export const leaguesService = {
    query,
    getLeagueById,
    getTeamByLeagueAndTeamId
}

const STORAGE_KEY = 'league-data'
const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL


_createLeagues()

async function query() {
    let leagues = await storageService.query(STORAGE_KEY)
    return Array.isArray(leagues) ? leagues : []
}

function getLeagueById(leagueId) {
    return storageService.get(STORAGE_KEY, (league) => league.league_id === leagueId)
}

async function getTeamByLeagueAndTeamId(leagueId, teamId) {
    const league = await storageService.get(STORAGE_KEY, leagueId)

    if (!league) {
        console.warn(`League with ID ${leagueId} not found`)
        return null
    }

    const team = league.league_teams.find((team) => team.team_key === teamId)

    if (!team) {
        console.warn(`Team with ID ${teamId} not found in league ${leagueId}`)
        return null
    }

    return team
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
        });

        // Fetch all leagues and filter for league_id = 1
        const leagues = Array.isArray(response.data) ? response.data.filter(league => league.league_id == 3) : []

        // Fetch teams and matches for the filtered league
        await Promise.all(leagues.map(async (league) => {
            const teams = await _fetchTeamsByLeagueId(league.league_id)
            league.league_teams = await Promise.all(teams.map(async (team) => {
                const teamData = await _fetchTeamMatches(team.team_key, league.league_id)
                return { ...team, ...teamData }
            }));
        }));

        return leagues
    } catch (error) {
        console.error('Error fetching leagues data:', error)
        return []
    }
}


// async function _fetchLeagues() {
//     try {
//         const response = await axios.get(`${BASE_URL}`, {
//             params: {
//                 action: 'get_leagues',
//                 APIkey: API_KEY
//             }
//         })

//         const leagues = Array.isArray(response.data) ? response.data : []     // use it in production

//         await Promise.all(leagues.map(async (league) => {
//             const teams = await _fetchTeamsByLeagueId(league.league_id)
//             league.league_teams = await Promise.all(teams.map(async (team) => {
//                 const teamData = await _fetchTeamMatches(team.team_key)
//                 return { ...team, ...teamData }
//             }))
//         }))

//         return leagues
//     } catch (error) {
//         console.error('Error fetching leagues data:', error)
//         return []
//     }
// }

async function _fetchTeamsByLeagueId(leagueId) {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: {
                action: 'get_teams',
                league_id: leagueId,
                APIkey: API_KEY
            }
        });
        const teams = Array.isArray(response.data) ? response.data : []
        return teams
    } catch (error) {
        console.error(`Error fetching teams for league ${leagueId}:`, error)
        return []
    }
}

async function _fetchTeamMatches(teamId, leagueId) {
    try {
        const today = new Date()
        const fromDate = new Date()
        fromDate.setMonth(today.getMonth() - 6) // 6 months ago

        const formatDate = (date) => date.toISOString().split('T')[0]

        const response = await axios.get(`${BASE_URL}`, {
            params: {
                action: 'get_events',
                APIkey: API_KEY,
                team_id: teamId,
                league_id: leagueId,
                from: formatDate(fromDate),
                to: formatDate(today),
            }
        });

        const matches = Array.isArray(response.data) ? response.data : []

        const homeMatches = matches
            .filter(match => match.match_hometeam_id === teamId)
            .slice(0, 7)
            .map(match => ({ match_id: match.match_id }))

        const awayMatches = matches
            .filter(match => match.match_awayteam_id === teamId)
            .slice(0, 7)
            .map(match => ({ match_id: match.match_id }))

        const homeStats = await _calculateTeamStatistics(homeMatches, teamId, 'home');
        const awayStats = await _calculateTeamStatistics(awayMatches, teamId, 'away');

        return {
            last_5_home_matches: homeMatches,
            last_5_away_matches: awayMatches,
            home_statistic: homeStats,
            away_statistic: awayStats
        }

    } catch (error) {
        console.error(`Error fetching matches for team ${teamId}:`, error)
        return {
            last_5_home_matches: [],
            last_5_away_matches: [],
            home_statistic: [],
            away_statistic: []
        }
    }
}

async function _calculateTeamStatistics(matches, teamId, type) {
    let winCount = 0, drawCount = 0, lossCount = 0
    let totalGoalsFirstHalf = 0, totalGoalsFullMatch = 0

    const fullMatchStatsSum = {}
    const firstHalfStatsSum = {}

    const cardsStatistic = {
        yellow: {
            first_half: 0,
            second_half: 0,
            full_match: 0
        },
        red: {
            first_half: 0,
            second_half: 0,
            full_match: 0
        }
    }

    for (const match of matches) {
        try {
            const matchData = await gamesService.getPastMatchById(match.match_id);

            if (matchData && Object.keys(matchData).length > 0) {
                const isHome = type === 'home'
                const teamScoreFirstHalf = isHome
                    ? parseInt(matchData.match_hometeam_halftime_score, 10) || 0
                    : parseInt(matchData.match_awayteam_halftime_score, 10) || 0
                const teamScoreFullMatch = isHome
                    ? parseInt(matchData.match_hometeam_ft_score, 10) || 0
                    : parseInt(matchData.match_awayteam_ft_score, 10) || 0
                const opponentScore = isHome
                    ? parseInt(matchData.match_awayteam_ft_score, 10) || 0
                    : parseInt(matchData.match_hometeam_ft_score, 10) || 0

                // Win/draw/loss calculation
                if (teamScoreFullMatch > opponentScore) winCount++
                else if (teamScoreFullMatch == opponentScore) drawCount++
                else lossCount++

                totalGoalsFirstHalf += teamScoreFirstHalf
                totalGoalsFullMatch += teamScoreFullMatch

                if (Array.isArray(matchData.statistics)) {
                    matchData.statistics.forEach((stat) => {
                        const statValue = isHome
                            ? parseInt(stat.home, 10) || 0
                            : parseInt(stat.away, 10) || 0

                        // Accumulate stats only for the current team (home/away)
                        if (!fullMatchStatsSum[stat.type]) {
                            fullMatchStatsSum[stat.type] = { sum: 0, count: 0 }
                        }
                        fullMatchStatsSum[stat.type].sum += statValue
                        fullMatchStatsSum[stat.type].count++
                    })
                }

                if (Array.isArray(matchData.statistics_1half)) {
                    matchData.statistics_1half.forEach((stat) => {
                        const statValue = isHome
                            ? parseInt(stat.home, 10) || 0
                            : parseInt(stat.away, 10) || 0

                        // Accumulate first half stats
                        if (!firstHalfStatsSum[stat.type]) {
                            firstHalfStatsSum[stat.type] = { sum: 0, count: 0 }
                        }
                        firstHalfStatsSum[stat.type].sum += statValue
                        firstHalfStatsSum[stat.type].count++
                    })
                }

                if (Array.isArray(matchData.cards)) {
                    matchData.cards.forEach((card) => {
                        const isTeamCard = (isHome && card.home_fault) || (!isHome && card.away_fault)
                        if (!isTeamCard) return

                        // Check the time of the card to determine the half
                        const cardMinute = parseInt(card.minute, 10) || 0
                        const isFirstHalf = cardMinute <= 45

                        // Update the card statistics object
                        if (card.card === 'yellow card') {
                            cardsStatistic.yellow.full_match++
                            if (isFirstHalf) cardsStatistic.yellow.first_half++
                            else cardsStatistic.yellow.second_half++
                        } else if (card.card === 'red card') {
                            cardsStatistic.red.full_match++
                            if (isFirstHalf) cardsStatistic.red.first_half++
                            else cardsStatistic.red.second_half++
                        }
                    })
                }
            }
        } catch (error) {
            console.warn(`Error fetching data for match ID ${match.match_id}:`, error);
        }
    }

    const totalMatches = matches.length || 1; // Prevent division by zero

    const teamStatistics = {
        win_percentage: parseFloat(((winCount / totalMatches) * 100).toFixed(2)),
        draw_percentage: parseFloat(((drawCount / totalMatches) * 100).toFixed(2)),
        loss_percentage: parseFloat(((lossCount / totalMatches) * 100).toFixed(2)),
        avg_goals_first_half: (totalGoalsFirstHalf / totalMatches).toFixed(2),
        avg_goals_full_match: (totalGoalsFullMatch / totalMatches).toFixed(2),
        cards_statistic: {
            first_half: {
                yellow_card_first_half: (cardsStatistic.yellow.first_half / totalMatches).toFixed(2),
                red_card_first_half: (cardsStatistic.red.first_half / totalMatches).toFixed(2),
            },
            second_half: {
                yellow_card_second_half: (cardsStatistic.yellow.second_half / totalMatches).toFixed(2),
                red_card_second_half: (cardsStatistic.red.second_half / totalMatches).toFixed(2),
            },
            full_match: {
                yellow_card_full_match: (cardsStatistic.yellow.full_match / totalMatches).toFixed(2),
                red_card_full_match: (cardsStatistic.red.full_match / totalMatches).toFixed(2)
            }
        }
    }

    // Calculate averages for each statistic and filter out zero averages
    teamStatistics.avg_statistics = Object.keys(fullMatchStatsSum).reduce((acc, type) => {
        const { sum, count } = fullMatchStatsSum[type]
        const avg = sum / count
        if (avg > 0) acc[type] = parseFloat(avg.toFixed(2))
        return acc
    }, {})

    // Calculate averages for first half statistics
    teamStatistics.avg_first_half_statistics = Object.keys(firstHalfStatsSum).reduce((acc, type) => {
        const { sum, count } = firstHalfStatsSum[type]
        const avg = sum / count
        if (avg > 0) acc[type] = parseFloat(avg.toFixed(2))
        return acc
    }, {})

    return teamStatistics
}



