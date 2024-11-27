import { useState, useEffect } from 'react'
import { leaguesService } from '../../services/leagues.service'
import { gamesService } from '../../services/games.service'
import { SearchBar } from '../../cmps/soccer/leagues-index/SearchBar'
import { LeaguesList } from '../../cmps/soccer/leagues-index/LeaguesList'

export function SoccerLeaguesIndex() {
    const [leagues, setLeagues] = useState([])

    const [pastMatch, setPastMatch] = useState([])

    useEffect(() => {
        loadLeagues()
        loadMatches()
    }, [])

    async function loadLeagues() {
        try {
            const leaguesData = await leaguesService.query()
            setLeagues(leaguesData)
        } catch (err) {
            console.log('Error in loading leagues', err)
        }
    }

    async function loadMatches() {
        try {
            const data = await gamesService.getPastGames()
            setPastMatch(data)
        } catch (err) {
            console.log('Error in loading leagues', err)
        }
    }

    return (
        <section className="leagues-index">
            <SearchBar />
            <LeaguesList leagues={leagues} matches={pastMatch} />
        </section>
    )
}


// LEAGUE DATA 

// country_id: "1"
// country_logo :  ""
// country_name :  "eurocups"
// league_id:  "3"
// league_logo: "https://apiv3.apifootball.com/badges/logo_leagues/3_uefa-champions-league.png"
// league_name: "UEFA Champions League"
// league_season: "2024/2025"
// league_teams: {}