import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

import { loadPreviousMatches } from '../../store/actions/previous-match.action'

import { SoccerPastMatchesList } from '../../cmps/soccer/past-match/SoccerPastMatchesList'
import { SkeletonMatchPreview } from '../../cmps/loaders/SkeletonMatchPreview'
import { showErrorMsg } from '../../services/event-bus.service'

export function SoccerPastIndex() {
    const previousMatches = useSelector((storeState) => storeState.previousMatchModule.previousMatches)
    const navigate = useNavigate()

    useEffect(() => {
        loadPastGames()
    }, [])

    async function loadPastGames() {
        try {
            await loadPreviousMatches()
        } catch (err) {
            console.log('Error in loading past games', err)
            showErrorMsg('Error in fetch Previous Matches, Please try again')
            navigate("/")
        }
    }

    return (
        <section className='past-match-index'>
            {previousMatches.length === 0 ? (
                <SkeletonMatchPreview />
            ) : (
                <SoccerPastMatchesList matches={previousMatches.slice(-15)} />
            )}
        </section>
    )
}
