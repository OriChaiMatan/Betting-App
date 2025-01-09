import { useState, useEffect, useRef } from 'react'
import { useForm } from '../../../customeHooks/useForm'

export function PastIndexFilter({ filterBy, onSetFilter, leagues }) {
    const [filterByToEdit, handleChange] = useForm(filterBy, onSetFilter)
    const [searchLeagueText, setSearchLeagueText] = useState('')
    const [filteredLeagues, setFilteredLeagues] = useState([])
    const [selectedLeague, setSelectedLeague] = useState(null)
    const [teams, setTeams] = useState([])
    const [showLeagueOptions, setShowLeagueOptions] = useState(false)
    const [showTeamOptions, setShowTeamOptions] = useState(false)
    const [searchTeamText, setSearchTeamText] = useState('')
    const [filteredTeams, setFilteredTeams] = useState([])

    useEffect(() => {
        setFilteredLeagues(leagues)
    }, [leagues])

    useEffect(() => {
        if (selectedLeague) {
            setTeams(selectedLeague.league_teams || [])
        } else {
            setTeams([])
        }
    }, [selectedLeague])

    useEffect(() => {
        setFilteredTeams(teams)
    }, [teams])

    useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest('.past-index-filter')) {
                setShowLeagueOptions(false)
                setShowTeamOptions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    const handleLeagueSearch = (text) => {
        setSearchLeagueText(text)

        if (!text) {
            // Clear league filter when input is cleared
            setFilteredLeagues(leagues)
            setSelectedLeague(null)
            handleChange({ target: { name: 'match_league', value: '' } })
        } else {
            setFilteredLeagues(
                leagues.filter((league) =>
                    league.league_name.toLowerCase().includes(text.toLowerCase())
                )
            )
        }
    }

    const handleLeagueSelect = (league) => {
        setSearchLeagueText(league.league_name)
        setSelectedLeague(league)
        setShowLeagueOptions(false)
        handleChange({ target: { name: 'match_league', value: league.league_name } })
    }

    const handleTeamSearch = (text) => {
        setSearchTeamText(text)

        if (!text) {
            // Clear team filter when input is cleared
            setFilteredTeams(teams);
            handleChange({ target: { name: 'match_team', value: '' } })
        } else {
            setFilteredTeams(
                teams.filter((team) =>
                    team.team_name.toLowerCase().includes(text.toLowerCase())
                )
            )
        }
    }

    const handleTeamSelect = (team) => {
        setSearchTeamText(team.team_name)
        setShowTeamOptions(false)
        handleChange({ target: { name: 'match_team', value: team.team_name } })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const onClearFilters = () => {
        setSearchLeagueText('')
        setSearchTeamText('')
        setSelectedLeague(null)
        setFilteredLeagues(leagues)
        setFilteredTeams([])
        handleChange({ target: { name: 'match_league', value: '' } })
        handleChange({ target: { name: 'match_team', value: '' } })
        handleChange({ target: { name: 'match_date', value: '' } })
        onSetFilter({}) // Reset filter in the parent component
    }

    return (
        <div className='filter'>
            <form className="past-index-filter" onSubmit={onSubmitFilter}>
                <input
                    type="date"
                    name="match_date"
                    value={filterByToEdit.match_date}
                    onChange={handleChange}
                    placeholder="Date"
                    className="date-input"
                    autoComplete="off"
                />
                <div className="input-container">
                    <input
                        type="text"
                        name="match_league"
                        value={searchLeagueText}
                        onChange={(e) => handleLeagueSearch(e.target.value)}
                        placeholder="League"
                        onFocus={() => setShowLeagueOptions(true)}
                        autoComplete="off"
                    />
                    {showLeagueOptions && (
                        <ul className="dropdown-options">
                            {filteredLeagues.map((league) => (
                                <li
                                    key={league.league_id}
                                    onClick={() => handleLeagueSelect(league)}
                                >
                                    {league.league_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        name="match_team"
                        value={searchTeamText}
                        onChange={(e) => handleTeamSearch(e.target.value)}
                        placeholder="Team"
                        onFocus={() => setShowTeamOptions(true)}
                        autoComplete="off"
                    />
                    {showTeamOptions && (
                        <ul className="dropdown-options">
                            {filteredTeams.map((team) => (
                                <li
                                    key={team.team_key}
                                    onClick={() => handleTeamSelect(team)}
                                >
                                    {team.team_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button type="submit">Search</button>
            </form>
            <button type="button" className='clear-filter' onClick={onClearFilters}>
                Clear Filters
            </button>

        </div>
    );
}
