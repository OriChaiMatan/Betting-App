import { useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useSelector } from 'react-redux'

import { loadPreviousMatches, setFilterBy } from '../../store/actions/previous-match.action'

import { SoccerPastMatchesList } from '../../cmps/soccer/past-match/SoccerPastMatchesList'
import { SkeletonMatchPreview } from '../../cmps/loaders/SkeletonMatchPreview'
import { PastIndexFilter } from '../../cmps/soccer/filters/PastIndexFilter'
import { showErrorMsg } from '../../services/event-bus.service'
import { gamesService } from '../../services/games.service'

export function SoccerPastIndex() {
    const previousMatches = useSelector((storeState) => storeState.previousMatchModule.previousMatches)
    const filterBy = useSelector((storeState) => storeState.previousMatchModule.filterBy)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setFilterBy(gamesService.getFilterFromParams(searchParams))
    }, [searchParams])

    useEffect(() => {
        if (filterBy) {
            const sanitizedFilterBy = Object.fromEntries(
                Object.entries(filterBy).filter(
                    ([key, value]) => value !== undefined && value !== ""
                )
            )
            setSearchParams(sanitizedFilterBy)  // Update the URL with the filter
            loadPreviousMatches()
        }
    }, [filterBy])
    
    function onSetFilter(fieldsToUpdate) {
        console.log('Setting filter:', fieldsToUpdate)
        setFilterBy(fieldsToUpdate)
    }

    return (
        <section className='past-match-index'>
            <PastIndexFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            {previousMatches.length === 0 ? (
                <SkeletonMatchPreview />
            ) : (
                <SoccerPastMatchesList matches={previousMatches} />
            )}
        </section>
    )
}
