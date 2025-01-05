import { useState, useEffect } from 'react'
import { useForm } from '../../../customeHooks/useForm'

export function PastIndexFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, handleChange] = useForm(filterBy, onSetFilter)

    useEffect(() => {
        onSetFilter(filterByToEdit)
      }, [filterByToEdit])

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return (
        <form className="past-index-filter" onSubmit={onSubmitFilter}>
            <input
                type="date"
                name="match_date"
                value={filterByToEdit.match_date}
                onChange={handleChange}
                placeholder="Date"
                className="date-input"
            />
            <input
                type="text"
                name="match_league"
                value={filterByToEdit.match_league}
                onChange={handleChange}
                placeholder="League"
            />
            <input
                type="text"
                name="match_team"
                value={filterByToEdit.match_team}
                onChange={handleChange}
                placeholder="Team"
            />
            <button type="submit">Search</button>
        </form>
    )
}
