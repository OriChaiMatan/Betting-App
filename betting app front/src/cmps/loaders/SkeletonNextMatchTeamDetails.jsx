import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function SkeletonNextMatchTeamDetails() {
  return (
    <div className='skeleton-next-match'>
        <Skeleton width="100%" height="15rem" borderRadius="2rem"/>
    </div>
  )
}