import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { leaguesService } from "../../services/leagues.service"
import { CallToActionHeader } from "../../cmps/soccer/future-match/CallToActionHeader"
import { TeamSlider } from "../../cmps/soccer/league-details/TeamsSlider"

export function SoccerLeagueDetails() {
    const [league, setLeague] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadLeague()
    }, [params.leagueId])

    async function loadLeague() {
        try {
            const data = await leaguesService.getLeagueById(params.leagueId)
            setLeague(data)
        } catch (err) {
            console.log('Error in load league', err)
        }
    }

    if (!league) return <div>Loading Match Details page...</div>
    return (
        <div className="league-details">
            <CallToActionHeader />
            <div className="league-header">
                <img
                    src={league.league_logo}
                    alt={`${league.league_name} logo`}
                    className="league-logo"
                />
                <div className="league-details">
                    <h1 className="league-name">{league.league_name}</h1>
                    <p className="league-season">Season: {league.league_season}</p>
                    <div className="country-info">
                        {league.country_logo && (
                            <img
                                src={league.country_logo}
                                alt={`${league.country_name} flag`}
                                className="country-logo"
                            />
                        )}
                        <span className="country-name">{league.country_name}</span>
                    </div>
                </div>
            </div>
            <TeamSlider league={league} />
        </div>
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