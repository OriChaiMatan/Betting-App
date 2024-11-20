import React, { useEffect, useRef, useState } from 'react';
import { SoccerFutureMatchesPreview } from '../future-match/SoccerFutureMatchesPreview';
import { MatchPreview } from './MatchPreview';

export function ManualCarousel({ matches }) {
    const [extendedMatches, setExtendedMatches] = useState(matches);
    const carouselRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        if (!matches || matches.length === 0) return;

        // Duplicate the slides to ensure seamless loop
        const extendedMatchesList = [...matches, ...matches].map((match, index) => ({
            ...match,
            uniqueKey: `${match.match_id}-${index}`, // Create a unique key by combining match_id and index
        }));
        
        setExtendedMatches(extendedMatchesList);

        const track = trackRef.current;
        const totalItems = extendedMatchesList.length;

        // Duration for the slide to complete one full loop
        const slideDuration = 1000; // 5 seconds for one full slide loop

        // Dynamically adjust sliding logic to ensure seamless loop
        const slide = () => {
            if (!track) return;

            track.style.transition = `transform ${slideDuration}ms linear`; // Smooth transition
            const currentTransform = getComputedStyle(track).transform;
            const currentX = currentTransform === 'none' ? 0 : parseInt(currentTransform.split(',')[4]);

            // Move the track by one slide's width
            const newX = currentX - (track.offsetWidth / totalItems);
            track.style.transform = `translate3d(${newX}px, 0, 0)`;
        };

        // Make the carousel loop
        const loop = setInterval(() => {
            slide();
        }, slideDuration);

        track.addEventListener('transitionend', () => {
            track.style.transition = 'none'; // Disable transition to reset position instantly
            track.style.transform = 'translate3d(0, 0, 0)'; // Reset to the original position
            track.appendChild(track.firstElementChild); // Move the first slide to the end
        });

        return () => clearInterval(loop); // Clean up the interval
    }, [matches]);

    return (
        <div className="carousel-container">
            <ul className="carousel-track" ref={trackRef}>
                {extendedMatches.map((match) => (
                    <li className="carousel-item" key={match.uniqueKey}>
                        <MatchPreview match={match} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
