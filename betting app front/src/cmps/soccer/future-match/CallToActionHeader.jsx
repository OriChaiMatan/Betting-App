import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io"
import { MdIosShare } from "react-icons/md"

export function CallToActionHeader() {
    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate(-1)
    }

    return (
        <div className='cta-header'>
            <button className='btn' onClick={handleBackClick}><IoIosArrowBack /></button>
            <div className="more-options">
                <Link to={'/bet'}><button className='btn'>Bet</button></Link>
                <Link to={'/ai-assistant'}><button className='btn'>AI</button></Link>
                <button className='btn'><MdIosShare /></button>     {/* Build a share options */}
            </div>
        </div>
    )
}