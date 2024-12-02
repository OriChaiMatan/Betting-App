import React, { useEffect, useRef, useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { TeamSliderItem } from "./TeamSliderItem"

export function TeamSlider({ league }) {
    const { league_teams } = league
    const containerRef = useRef(null)
    const [scrollPosition, setScrollPosition] = useState(0)
    const [isRightVisible, setIsRightVisible] = useState(true)
    const [isLeftVisible, setIsLeftVisible] = useState(false)

    const ITEM_WIDTH = 200 // Adjust based on your item size
    const SCROLL_AMOUNT = ITEM_WIDTH * 4

    const handleScroll = (scrollAmount) => {
        const newScrollPosition = scrollPosition + scrollAmount
        const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth

        setScrollPosition(newScrollPosition)

        containerRef.current.scrollLeft = newScrollPosition

        // Update visibility
        setIsLeftVisible(newScrollPosition > 0)
        setIsRightVisible(newScrollPosition < maxScroll)
    };

    // Ensure visibility updates on first render
    useEffect(() => {
        const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth
        setIsRightVisible(scrollPosition < maxScroll)
    }, [league_teams])


    return (
        <section className="team-slider">
            <button
                className={`slider-button left ${isLeftVisible ? "visible" : "hidden"}`}
                onClick={() => handleScroll(-SCROLL_AMOUNT)}
            >
                <FaArrowCircleLeft />
            </button>
            <div className="slider-container" ref={containerRef}>
                {league_teams.map((team) => (
                    <TeamSliderItem
                        key={team.team_key}
                        imgSrc={team.team_badge}
                        altText={team.team_name}
                        nameLabel={team.team_name}
                    />
                ))}
            </div>
            <button
                className={`slider-button right ${isRightVisible ? "visible" : "hidden"}`}
                onClick={() => handleScroll(SCROLL_AMOUNT)}
            >
                <FaArrowCircleRight />
            </button>
        </section>
    );
}
