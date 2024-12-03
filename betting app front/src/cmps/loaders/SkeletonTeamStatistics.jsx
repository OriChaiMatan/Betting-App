import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function SkeletonTeamStatistics() {
  return (
    <div className='skeleton-statistics'>
        <Skeleton width="100%" height="60rem" borderRadius="2rem"/>
    </div>
  )
}