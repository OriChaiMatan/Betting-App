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
    const [searchParams, setSearchParams] = useSearchParams()
    // const previousMatches = useSelector((storeState) => storeState.previousMatchModule.previousMatches)
    const [filteredMatches, setFilteredMatches] = useState([])
    // const filterBy = useSelector((storeState) => storeState.previousMatchModule.filterBy)
    const [filterBy, setFilterBy] = useState(gamesService.getFilterFromParams(searchParams))

    useEffect(() => {
        setSearchParams(filterBy)
        loadPastMatches() // Fetch matches only when filters change
    }, [filterBy])

    // useEffect(() => {
    //     setFilterBy(gamesService.getFilterFromParams(searchParams))
    // }, [searchParams])

    // useEffect(() => {
    //     if (filterBy) {
    //         const sanitizedFilterBy = Object.fromEntries(
    //             Object.entries(filterBy).filter(
    //                 ([key, value]) => value !== undefined && value !== ""
    //             )
    //         )
    
    //         // Only update searchParams if there's a change
    //         const currentParams = Object.fromEntries([...searchParams]);
    //         if (JSON.stringify(currentParams) !== JSON.stringify(sanitizedFilterBy)) {
    //             setSearchParams(sanitizedFilterBy);
    //         }
    //     }

    // }, [filterBy]);
    
    
    function onSetFilter(fieldsToUpdate) {
        setFilterBy(fieldsToUpdate)
    }

    async function loadPastMatches() {
        try {
        //   await loadPreviousMatches()
        const matches = await gamesService.getPastGames(filterBy)
        setFilteredMatches(matches)
        } catch (err) {
          console.log('Error in loading past matches', err)
          showErrorMsg('Error in fetching Previous Matches, Please try again')
        }
      }

    return (
        <section className='past-match-index'>
            <PastIndexFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            {(filteredMatches.length === 0 || !filteredMatches) ? (
                <SkeletonMatchPreview />
            ) : (
                <SoccerPastMatchesList matches={filteredMatches} />
            )}
        </section>
    )
}
