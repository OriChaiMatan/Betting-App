import React, { useState } from 'react'

export function LeagueIndexFilter({ leagues, onLeagueSelect }) {
    const [searchText, setSearchText] = useState('')
    const [filteredLeagues, setFilteredLeagues] = useState(leagues)
    const [showOptions, setShowOptions] = useState(false)

    const handleInputChange = (event) => {
        const text = event.target.value
        setSearchText(text)
        setFilteredLeagues(
            leagues.filter(league =>
                league.league_name.toLowerCase().includes(text.toLowerCase())
            )
        );
        setShowOptions(true)
    };

    const handleOptionClick = (league) => {
        setSearchText(league.league_name) // Set selected league name in the input
        setShowOptions(false) // Hide the dropdown
        onLeagueSelect(league) // Pass selected league to parent
    };

    const handleBlur = () => {
        // Delay hiding options to allow clicking
        setTimeout(() => setShowOptions(false), 100)
    }

    return (
        <div className="search-bar-container" onBlur={handleBlur}>
            <input
                type="text"
                value={searchText}
                onChange={handleInputChange}
                placeholder="Search for a league..."
                onFocus={() => setShowOptions(true)} // Show options on focus
            />
            {showOptions && (
                <ul className="dropdown-options">
                    {filteredLeagues.map(league => (
                        <li
                            key={league.league_id}
                            onClick={() => handleOptionClick(league)}
                        >
                            {league.league_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

