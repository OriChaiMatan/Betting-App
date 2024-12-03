import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { leaguesService } from '../../services/leagues.service'
import { gamesService } from '../../services/games.service'
import { SearchBar } from '../../cmps/soccer/leagues-index/SearchBar'
import { LeaguesList } from '../../cmps/soccer/leagues-index/LeaguesList'
import { showErrorMsg } from '../../services/event-bus.service'

export function SoccerLeaguesIndex() {
    const [leagues, setLeagues] = useState([])
    const [pastMatch, setPastMatch] = useState([])
    const navigate = useNavigate()

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
            showErrorMsg('Error in fetch Leagues, Please try again')
            navigate("/")
        }
    }

    async function loadMatches() {
        try {
            const data = await gamesService.getPastGames()
            setPastMatch(data)
        } catch (err) {
            console.log('Error in loading leagues', err)
            showErrorMsg('Error in fetch Matches, Please try again')
        }
    }

    return (
        <section className="leagues-index">
            <SearchBar />
            <LeaguesList leagues={leagues} matches={pastMatch} />
        </section>
    )
}