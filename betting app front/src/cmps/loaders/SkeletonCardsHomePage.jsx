import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function SkeletonCard() {
  return (
    <div className='skeleton-cards'>
        <Skeleton width="55rem" height="20rem"/>
        <Skeleton width="40rem" height="20rem"/>
    </div>
  )
}