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