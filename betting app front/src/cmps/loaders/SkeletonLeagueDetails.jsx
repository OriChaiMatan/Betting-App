import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function SkeletonLeagueDetails() {
    return (
        <div className='skeleton-league-details'>
            <div className="logo">
                <Skeleton width="8rem" height="8rem" borderRadius="0.5rem" />
            </div>
            <div className="text">
                <Skeleton width="8rem" borderRadius="0.5rem" count={3} style={{ marginBottom: "1.3rem" }}/>
            </div>
        </div>
    )
}