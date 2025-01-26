import { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom"

import { SoccerPastMatchesList } from '../../cmps/soccer/past-match/SoccerPastMatchesList'
import { SkeletonMatchPreview } from '../../cmps/loaders/SkeletonMatchPreview'
import { PastIndexFilter } from '../../cmps/soccer/filters/PastIndexFilter'
import { showErrorMsg } from '../../services/event-bus.service'
import { gamesService } from '../../services/games.service'
import { leaguesService } from '../../services/leagues.service'

export function SoccerPastIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [filteredMatches, setFilteredMatches] = useState([])
    const [leagues, setLeagues] = useState([])
    const [filterBy, setFilterBy] = useState(gamesService.getFilterFromParams(searchParams))

    useEffect(() => {
        setSearchParams(filterBy)
        loadPastMatches() // Fetch matches only when filters change
    }, [filterBy])

    useEffect(() => {
        loadLeagues()
    }, [])

    useEffect(() => {
        if (filterBy) {
            const sanitizedFilterBy = Object.fromEntries(
                Object.entries(filterBy).filter(
                    ([key, value]) => value !== undefined && value !== ""
                )
            )

            // Only update searchParams if there's a change
            const currentParams = Object.fromEntries([...searchParams])
            if (JSON.stringify(currentParams) !== JSON.stringify(sanitizedFilterBy)) {
                setSearchParams(sanitizedFilterBy)
            }
        }
    }, [filterBy])


    function onSetFilter(fieldsToUpdate) {
        setFilterBy(fieldsToUpdate)
    }

    async function loadPastMatches() {
        try {
            const matches = await gamesService.getPastGames(filterBy)
            setFilteredMatches(matches)
        } catch (err) {
            console.log('Error in loading past matches', err)
            showErrorMsg('Error in fetching Previous Matches, Please try again')
        }
    }

    async function loadLeagues() {
        try {
            const leagueData = await leaguesService.query()
            setLeagues(leagueData)
        } catch (err) {
            console.log('Error loading leagues:', err)
        }
    }

    return (
        <section className='past-match-index'>
            <PastIndexFilter filterBy={filterBy} onSetFilter={onSetFilter} leagues={leagues}  />
            {(filteredMatches.length === 0 || !filteredMatches) ? (
                <SkeletonMatchPreview />
            ) : (
                <SoccerPastMatchesList matches={filteredMatches.reverse()} />
            )}
        </section>
    )
}
