import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function SkeletonLeaguePreview({ cards }) {
    return (
        <div className="skeleton-league-preview-container">
            {Array(cards).fill(0).map((item, i) =>
                <div className='skeleton-league-preview' key={i}>
                    <div className='top-row'>
                        <Skeleton width="8rem" height="8rem" borderRadius="0.5rem" />
                    </div>
                    <div className='top-row'>
                        <Skeleton width="8rem" borderRadius="0.5rem" />
                    </div>
                </div>
            )}
        </div>
    )
}