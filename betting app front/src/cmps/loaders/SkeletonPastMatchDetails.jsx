import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { CallToActionHeader } from '../soccer/future-match/CallToActionHeader'
import { SkeletonMatchPreview } from './SkeletonMatchPreview'

export function SkeletonPastMatchDetails() {
    return (
        <div className='skeleton-past-match-details'>
            <CallToActionHeader />
            <div className="header">
                <Skeleton height="15rem" borderRadius="0.5rem" />
                <Skeleton height="15rem" borderRadius="0.5rem" />
            </div>
            <SkeletonMatchPreview />
        </div>
    )
}