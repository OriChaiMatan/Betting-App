import React from 'react'
import { useState, useEffect } from 'react'
import { gamesService } from '../../services/games.service'
import { ManualCarousel } from '../../cmps/soccer/home-page/MatchList'
import { FutureMatchTable } from '../../cmps/soccer/home-page/FutureMatchTable'
import { PastMatchTable } from '../../cmps/soccer/home-page/PastMatchTable'

export function SoccerHomePage() {

  const [futureMatches, setFutureMatches] = useState([])
  const [pastMatches, setPastMatches] = useState([])

  useEffect(() => {
    loadFutureMatchess()
    loadPastMatchess()
  }, [])

  async function loadFutureMatchess() {
    try {
      const data = await gamesService.getFutureGames()
      setFutureMatches(data)
    } catch (err) {
      console.log('Error in loading future matches', err)
    }
  }

  async function loadPastMatchess() {
    try {
      const data = await gamesService.getPastGames()
      setPastMatches(data)
    } catch (err) {
      console.log('Error in loading past matches', err)
    }
  }

  function getRandomMatchesForToday(matches, count) {
    const today = new Date();
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
        <PastMatchTable matches={pastMatches} />
      </div>
    </div>
  )
}

