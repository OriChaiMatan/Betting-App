import { useState } from "react"
import { FutureMatchTableList } from "../home-page/FutureMatchTableList"
import { PastMatchTableList } from "../home-page/PastMatchTableList"

export function MatchSection({ pastMatches, futureMatches }) {
    const [view, setView] = useState('previous-matches')

    const handleViewChange = (selectedView) => {
        setView(selectedView)
    }

    return (
        <div className='league-matches-section'>
            <div className="buttons">
                <button onClick={() => handleViewChange("previous-matches")} className={view === 'previous-matches' ? 'active' : ''}>
                    Previous Matches
                </button>
                <button onClick={() => handleViewChange("future-matches")} className={view === 'future-matches' ? 'active' : ''}>
                    Future Matches
                </button>
            </div>
            <div className="matches-content">
                {view === "previous-matches" && <PastMatchTableList matches={pastMatches} />}
                {view === "future-matches" && <FutureMatchTableList matches={futureMatches} />}
            </div>
        </div>
    )
}