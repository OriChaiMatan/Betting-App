import { useState, useEffect } from 'react'
import { leaguesService } from '../../services/leagues.service'
import { SearchBar } from '../../cmps/soccer/leagues-index/SearchBar'
import { LeaguesList } from '../../cmps/soccer/leagues-index/LeaguesList'

export function SoccerLeaguesIndex() {
    const [leagues, setLeagues] = useState([])

    useEffect(() => {
        loadLeagues()
    }, [])

    async function loadLeagues() {
        try {
            const leaguesData = await leaguesService.query()
            setLeagues(leaguesData)
        } catch (err) {
            console.log('Error in loading leagues', err)
        }
    }
    return (
        <section className="leagues-index">
            <SearchBar />
            <LeaguesList leagues={leagues} />
            {/* <h1 className="leagues-title">Top Soccer Leagues</h1>
            <div className="leagues-grid">
                {leagues.map((league) => (
                    <div className="league-card" key={league.league_id}>
                        <div className="league-logo">
                            <img
                                src={league.league_logo || 'https://via.placeholder.com/100x100?text=No+Logo'}
                                alt={`${league.league_name} logo`}
                            />
                        </div>
                        <div className="league-info">
                            <h3>{league.league_name}</h3>
                        </div>
                    </div>
                ))}
                {leagues.map((league) => (
                    <div className="league-card" key={league.league_id}>
                        <div className="league-logo">
                            <img
                                src={league.league_logo || 'https://via.placeholder.com/100x100?text=No+Logo'}
                                alt={`${league.league_name} logo`}
                            />
                        </div>
                        <div className="league-info">
                            <h3>{league.league_name}</h3>
                        </div>
                    </div>
                ))}
                {leagues.map((league) => (
                    <div className="league-card" key={league.league_id}>
                        <div className="league-logo">
                            <img
                                src={league.league_logo || 'https://via.placeholder.com/100x100?text=No+Logo'}
                                alt={`${league.league_name} logo`}
                            />
                        </div>
                        <div className="league-info">
                            <h3>{league.league_name}</h3>
                        </div>
                    </div>
                ))} */}
            {/* </div> */}
        </section>
    )
}


// LEAGUE DATA 

// country_id: "1"
// country_logo :  ""
// country_name :  "eurocups"
// league_id:  "3"
// league_logo: "https://apiv3.apifootball.com/badges/logo_leagues/3_uefa-champions-league.png"
// league_name: "UEFA Champions League"
// league_season: "2024/2025"
// league_teams: {}