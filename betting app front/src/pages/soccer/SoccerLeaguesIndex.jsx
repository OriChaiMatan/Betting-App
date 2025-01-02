import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

import { loadLeagues } from '../../store/actions/league.action'
import { loadPreviousMatches } from '../../store/actions/previous-match.action'

import { SearchBar } from '../../cmps/soccer/leagues-index/SearchBar'
import { LeaguesList } from '../../cmps/soccer/leagues-index/LeaguesList'
import { showErrorMsg } from '../../services/event-bus.service'
import { LeagueIndexFilter } from '../../cmps/soccer/filters/LeagueIndexFilter'

export function SoccerLeaguesIndex() {
    const dispatch = useDispatch()
    const leagues = useSelector((storeState) => storeState.leagueModule.leagues)
    const pastMatch = useSelector((storeState) => storeState.previousMatchModule.previousMatches)
    const navigate = useNavigate()

    useEffect(() => {
        loadLeaguesData()
        loadMatches()
    }, [])

    async function loadLeaguesData() {
        try {
            await loadLeagues()
        } catch (err) {
            console.log('Error in loading leagues', err)
            showErrorMsg('Error in fetch Leagues, Please try again')
            navigate("/")
        }
    }

    async function loadMatches() {
        try {
            await loadPreviousMatches()
        } catch (err) {
            console.log('Error in loading leagues', err)
            showErrorMsg('Error in fetch Matches, Please try again')
        }
    }

    const handleLeagueSelect = (league) => {
        navigate(`/league-details/${league.league_id}`)
    }

    return (
        <section className="leagues-index">
            <LeagueIndexFilter leagues={leagues} onLeagueSelect={handleLeagueSelect}/>
            <LeaguesList leagues={leagues.slice(-6)} matches={pastMatch} />
        </section>
    )
}