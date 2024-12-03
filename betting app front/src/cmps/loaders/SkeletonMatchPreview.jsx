import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function SkeletonMatchPreview() {
    return (
        <div className='skeleton-table'>
            <Skeleton width="100%" height="35rem" borderRadius="1rem" count={8} />
        </div>
    )
}