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
    const league = await storageService.get(STORAGE_KEY, leagueId);

    if (!league) {
        console.warn(`League with ID ${leagueId} not found`);
        return null;
    }

    const team = league.league_teams.find((team) => team.team_key === teamId);

    if (!team) {
        console.warn(`Team with ID ${teamId} not found in league ${leagueId}`);
        return null;
    }

    return team;
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
            league.league_teams = await Promise.all(teams.map(async (team) => {
                const teamData = await _fetchTeamMatches(team.team_key)
                return { ...team, ...teamData }
            }))
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
        const teams = Array.isArray(response.data) ? response.data : []
        return teams
    } catch (error) {
        console.error(`Error fetching teams for league ${leagueId}:`, error)
        return []
    }
}

async function _fetchTeamMatches(teamId) {
    try {
        const today = new Date();
        const fromDate = new Date();
        fromDate.setMonth(today.getMonth() - 6); // 6 months ago

        const formatDate = (date) => date.toISOString().split('T')[0];

        const response = await axios.get(`${BASE_URL}`, {
            params: {
                action: 'get_events',
                APIkey: API_KEY,
                team_id: teamId,
                from: formatDate(fromDate),
                to: formatDate(today),
            }
        });

        const matches = Array.isArray(response.data) ? response.data : [];

        const homeMatches = matches
            .filter(match => match.match_hometeam_id === teamId)
            .slice(0, 7)
            .map(match => ({ match_id: match.match_id }));

        const awayMatches = matches
            .filter(match => match.match_awayteam_id === teamId)
            .slice(0, 7)
            .map(match => ({ match_id: match.match_id }));

        const homeStats = await _calculateTeamStatistics(homeMatches, teamId, 'home');
        const awayStats = await _calculateTeamStatistics(awayMatches, teamId, 'away');

        return {
            last5HomeMatches: homeMatches,
            last5AwayMatches: awayMatches,
            homeStats,
            awayStats
        };
    } catch (error) {
        console.error(`Error fetching matches for team ${teamId}:`, error);
        return {
            last5HomeMatches: [],
            last5AwayMatches: [],
            homeStats: { win: 0, draw: 0, loss: 0 },
            awayStats: { win: 0, draw: 0, loss: 0 }
        };
    }
}

async function _calculateTeamStatistics(matches, teamId, type) {
    let winCount = 0, drawCount = 0, lossCount = 0
    let totalGoalsFirstHalf = 0, totalGoalsFullMatch = 0
    let totalCards = 0
    let totalCorners = 0, totalCornersFirstHalf = 0
    let totalOnTargetShots = 0, totalSubstitutions = 0
    let totalPenalties = 0, totalGoalKicks = 0
    let totalGoalTime = 0, goalCount = 0

    for (const match of matches) {
        try {
            const matchData = await gamesService.getPastMatchById(match.match_id)

            if (matchData) {
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

                // Win/loss/draw calculations
                if (teamScoreFullMatch > opponentScore) {
                    winCount++
                } else if (teamScoreFullMatch === opponentScore) {
                    drawCount++
                } else {
                    lossCount++
                }

                // Aggregate goals
                totalGoalsFirstHalf += teamScoreFirstHalf
                totalGoalsFullMatch += teamScoreFullMatch

                // Calculate cards
                totalCards += matchData.cards
                    ? matchData.cards.reduce((acc, card) => {
                        const isTeamCard = isHome ? !!card.home_fault : !!card.away_fault
                        return isTeamCard ? acc + 1 : acc
                    }, 0)
                    : 0

                // Extract additional statistics
                const statistics = matchData.statistics || []
                statistics.forEach((stat) => {
                    const teamStat = isHome
                        ? parseInt(stat.home, 10) || 0
                        : parseInt(stat.away, 10) || 0
                    switch (stat.type) {
                        case 'Corners':
                            totalCorners += teamStat
                            break
                        case 'On Target':
                            totalOnTargetShots += teamStat
                            break
                        case 'Substitution':
                            totalSubstitutions += teamStat
                            break
                        case 'Penalty':
                            totalPenalties += teamStat
                            break
                        case 'Goal Kick':
                            totalGoalKicks += teamStat
                            break
                    }
                })

                // Extract first half statistics
                const statisticsFirstHalf = matchData.statistics_1half || []
                statisticsFirstHalf.forEach((stat) => {
                    const teamStat = isHome
                        ? parseInt(stat.home, 10) || 0
                        : parseInt(stat.away, 10) || 0
                    if (stat.type === 'Corners') {
                        totalCornersFirstHalf += teamStat
                    }
                })

                // Calculate average goal time
                matchData.goalscorer?.forEach((goal) => {
                    const isTeamGoal = isHome
                        ? goal.home_scorer && goal.home_scorer_id === teamId
                        : goal.away_scorer && goal.away_scorer_id === teamId
                    if (isTeamGoal) {
                        totalGoalTime += parseInt(goal.time, 10) || 0
                        goalCount++
                    }
                })
            }
        } catch (error) {
            console.warn(`Match with ID ${match.match_id} not found in past-games-data. Skipping.`)
        }
    }

    const totalMatches = matches.length || 1 // Prevent division by zero
    return {
        // Percentage calculations
        winPercentage: parseFloat(((winCount / totalMatches) * 100).toFixed(2)),
        drawPercentage: parseFloat(((drawCount / totalMatches) * 100).toFixed(2)),
        lossPercentage: parseFloat(((lossCount / totalMatches) * 100).toFixed(2)),
        
        // First half statistics
        avgGoalsFirstHalf: parseFloat((totalGoalsFirstHalf / totalMatches).toFixed(2)),
        avgCornersFirstHalf: parseFloat((totalCornersFirstHalf / totalMatches).toFixed(2)),
    
        // Second half calculations (Full match - First half)
        avgGoalsSecondHalf: parseFloat(((totalGoalsFullMatch - totalGoalsFirstHalf) / totalMatches).toFixed(2)),
        avgCornersSecondHalf: parseFloat(((totalCorners - totalCornersFirstHalf) / totalMatches).toFixed(2)),   

        // Full match statistics
        avgGoalsFullMatch: parseFloat((totalGoalsFullMatch / totalMatches).toFixed(2)),
        avgCorners: parseFloat((totalCorners / totalMatches).toFixed(2)),
        avgCards: parseFloat((totalCards / totalMatches).toFixed(2)),
        avgOnTargetShots: parseFloat((totalOnTargetShots / totalMatches).toFixed(2)),
        avgSubstitutions: parseFloat((totalSubstitutions / totalMatches).toFixed(2)),
        avgPenalties: parseFloat((totalPenalties / totalMatches).toFixed(2)),
        avgGoalKicks: parseFloat((totalGoalKicks / totalMatches).toFixed(2)),
        avgGoalTime: parseFloat((goalCount ? totalGoalTime / goalCount : 0).toFixed(2)),
    }
    
}
