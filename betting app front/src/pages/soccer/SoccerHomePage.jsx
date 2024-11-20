import React from 'react'
import { useState, useEffect } from 'react'
import { gamesService } from '../../services/games.service'
import { ManualCarousel } from '../../cmps/soccer/home-page/MatchList'

export function SoccerHomePage() {

  const [matches, setMatches] = useState([])

  useEffect(() => {
    loadMatchess()
  }, [])

  async function loadMatchess() {
    try {
      const data = await gamesService.getFutureGames()
      setMatches(data)
    } catch (err) {
      console.log('Error in loading matches', err)
    }
  }

  function getRandomMatches(matches, count) {
    const shuffled = [...matches].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const randomMatches = getRandomMatches(matches, 7);

  return (
    <div className='home-page'>
      <ManualCarousel matches={randomMatches} />
    </div>
  )
}

