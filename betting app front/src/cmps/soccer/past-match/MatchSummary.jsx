import React from 'react';
import { IoMdFootball } from "react-icons/io";


export function MatchSummary({ match }) {
    const mergeEvents = () => {
        const goalEvents = match.goalscorer.map(goal => {
            const homeGoal = goal.home_scorer ? {
                time: goal.time,
                type: <IoMdFootball />,
                player: goal.home_scorer,
                team: 'home'
            } : null

            const awayGoal = goal.away_scorer ? {
                time: goal.time,
                type: <IoMdFootball />,
                player: goal.away_scorer,
                team: 'away'
            } : null

            return [homeGoal, awayGoal].filter(event => event !== null)
        }).flat()

        const cardEvents = match.cards.map(card => {
            const homeCard = card.home_fault ? {
                time: card.time,
                type: card.card,
                player: card.home_fault,
                team: 'home'
            } : null

            const awayCard = card.away_fault ? {
                time: card.time,
                type: card.card,
                player: card.away_fault,
                team: 'away'
            } : null

            return [homeCard, awayCard].filter(event => event !== null)
        }).flat()


        return [...goalEvents, ...cardEvents].sort((a, b) => {
            const parseTime = (time) => {
                const [min, sec] = time.split('+').map(Number)
                return min * 60 + (sec || 0)
            }
            return parseTime(a.time) - parseTime(b.time)
        })
    }


    const groupEventsByHalf = () => {
        const events = mergeEvents()
        const firstHalfEvents = events.filter(event => {
            const time = parseInt(event.time.split('+')[0]) // Handle '45+3' format
            return time <= 45
        });
        const secondHalfEvents = events.filter(event => {
            const time = parseInt(event.time.split('+')[0]) // Handle '45+3' format
            return time > 45
        });

        return { firstHalfEvents, secondHalfEvents }
    };

    const { firstHalfEvents, secondHalfEvents } = groupEventsByHalf()

    const formatTime = (time) => {
        if (time.includes('+')) {
            return time; // For '45+3' format
        }
        return `${time}'`
    };

    return (
        <div className='match-summary'>
            <div className="title">
                <h3 className="heading-tertiary">Match Events</h3>
            </div>
            {/* 1st Half */}
            <div className="half">
                <div className="second-title">
                    <h3 className="half-title">1st Half</h3>
                </div>
                <div className="teams">
                    <div className="team">
                        <div className="team-title">
                            <h4>Home Team</h4>
                        </div>
                        <div className="data">
                            {firstHalfEvents.filter(event => event.team === 'home').length === 0 ? (
                                <p>No events for the home team in the 1st half.</p>
                            ) : (
                                firstHalfEvents.filter(event => event.team === 'home').map((event, index) => (
                                    <div key={index} className="event">
                                        <p>{formatTime(event.time)} : {event.player} - {event.type}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <div className="team">
                        <div className="team-title">
                            <h4>Away Team</h4>
                        </div>
                        <div className="data">
                            {firstHalfEvents.filter(event => event.team === 'away').length === 0 ? (
                                <p>No events for the away team in the 1st half.</p>
                            ) : (
                                firstHalfEvents.filter(event => event.team === 'away').map((event, index) => (
                                    <div key={index} className="event">
                                        <p>{formatTime(event.time)} : {event.player} - {event.type}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* 2nd Half */}
            <div className="half">
                <div className="second-title">
                    <h3 className="half-title">2nd Half</h3>
                </div>
                {/* Home Team Events */}
                <div className="teams">
                    <div className="team">
                        <div className="team-title">
                            <h4>Home Team</h4>
                        </div>
                        <div className="data">
                            {secondHalfEvents.filter(event => event.team === 'home').length === 0 ? (
                                <p>No events for the home team in the 2nd half.</p>
                            ) : (
                                secondHalfEvents.filter(event => event.team === 'home').map((event, index) => (
                                    <div key={index} className="event">
                                        <p>{formatTime(event.time)} : {event.player} - {event.type}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Away Team Events */}
                    <div className="team">
                        <div className="team-title">
                            <h4>Away Team</h4>
                        </div>
                        <div className="data">
                            {secondHalfEvents.filter(event => event.team === 'away').length === 0 ? (
                                <p>No events for the away team in the 2nd half.</p>
                            ) : (
                                secondHalfEvents.filter(event => event.team === 'away').map((event, index) => (
                                    <div key={index} className="event">
                                        <p>{formatTime(event.time)} : {event.player} - {event.type}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
