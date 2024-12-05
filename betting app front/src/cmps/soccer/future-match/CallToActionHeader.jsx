import { Link, useNavigate } from 'react-router-dom'

import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service'

import { IoIosArrowBack } from "react-icons/io"
import { MdIosShare } from "react-icons/md"

export function CallToActionHeader() {
    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate(-1)
    }

    const handleShareClick = () => {
        if (navigator.share) {
            navigator.share({
                title: document.title, // Title of the page
                url: window.location.href, // Current URL
            })
            .then(() => showSuccessMsg('Shared successfully'))
            .catch((error) => console.log('Error sharing', error))
        } else {
            showErrorMsg('Web Share API is not supported in this browser.')
        }
    }

    return (
        <div className='cta-header'>
            <button className='btn' onClick={handleBackClick}><IoIosArrowBack /></button>
            <div className="more-options">
                <Link to={'/bet'}><button className='btn'>Bet</button></Link>
                <Link to={'/ai-assistant'}><button className='btn'>AI</button></Link>
                <button className='btn' onClick={handleShareClick}><MdIosShare /></button>     {/* Build a share options */}
            </div>
        </div>
    )
}