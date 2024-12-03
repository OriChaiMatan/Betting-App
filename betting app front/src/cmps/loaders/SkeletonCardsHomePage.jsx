import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function SkeletonCard() {
  return (
    <div className='skeleton-cards'>
        <Skeleton width="55rem" height="23rem" borderRadius="2rem"/>
        <Skeleton width="55rem" height="23rem" borderRadius="2rem"/>
    </div>
  )
}