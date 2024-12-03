import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function SkeletonTeamInfoDetails() {
    return (
        <div className='skeleton-team-info-details'>
            <div className="logo">
                <Skeleton width="15rem" height="15rem" circle />
            </div>
            <div className="text">
                <Skeleton width="35rem" height="2rem" borderRadius="0.5rem" count={3} style={{ marginBottom: "1.3rem" }}/>
            </div>
        </div>
    )
}