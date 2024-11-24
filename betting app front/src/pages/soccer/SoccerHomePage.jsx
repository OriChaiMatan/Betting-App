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

  function getRandomMatches(matches, count) {
    const shuffled = [...matches].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const randomMatches = getRandomMatches(futureMatches, 15);

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

