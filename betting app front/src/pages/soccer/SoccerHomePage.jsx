import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadPreviousMatches } from '../../store/actions/previous-match.action'
import { loadFutureMatches } from '../../store/actions/future-match.action'

import { ManualCarousel } from '../../cmps/soccer/home-page/MatchList'
import { FutureMatchTable } from '../../cmps/soccer/home-page/FutureMatchTable'
import { PastMatchTable } from '../../cmps/soccer/home-page/PastMatchTable'
import { showErrorMsg } from "../../services/event-bus.service"

export function SoccerHomePage() {

  const futureMatches = useSelector((storeState) => storeState.futureMatchModule.futureMatches)
  const previousMatches = useSelector((storeState) => storeState.previousMatchModule.previousMatches)

  useEffect(() => {
    loadFutureMatchess()
    loadPastMatches()
  }, [])

  async function loadFutureMatchess() {
    try {
      await loadFutureMatches()
    } catch (err) {
      console.log('Error in loading future matches', err)
      showErrorMsg('Error in fetching Future Matches, Please try again')
    }
  }

  async function loadPastMatches() {
    try {
      await loadPreviousMatches()
    } catch (err) {
      console.log('Error in loading past matches', err)
      showErrorMsg('Error in fetching Previous Matches, Please try again')
    }
  }

  function getRandomMatchesForToday(matches, count) {
    const today = new Date()
    // Filter matches for today's date
    const todayMatches = matches.filter((match) => {
      const matchDate = new Date(match.match_date)
      return (
        matchDate.getDate() === today.getDate() &&
        matchDate.getMonth() === today.getMonth() &&
        matchDate.getFullYear() === today.getFullYear()
      )
    })
    // Shuffle and get the desired number of matches
    const shuffled = [...todayMatches].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const randomMatches = getRandomMatchesForToday(futureMatches, 15)

  return (
    <div className='home-page'>
      <ManualCarousel matches={randomMatches} />
      <div className="home-container">
        <FutureMatchTable matches={futureMatches} />
        <PastMatchTable matches={previousMatches} />
      </div>
    </div>
  )
}

