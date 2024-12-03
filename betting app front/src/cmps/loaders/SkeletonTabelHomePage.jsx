import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function SkeletonTabelHomePage() {
  return (
    <div className='skeleton-table'>
        <Skeleton width="100%" height="15rem" borderRadius="2rem" count={5}/>
    </div>
  )
}