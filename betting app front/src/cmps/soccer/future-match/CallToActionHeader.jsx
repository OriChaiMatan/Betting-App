import { useNavigate } from 'react-router-dom'
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
                <button className='btn'>Bet</button>
                <button className='btn'>AI</button>
                <button className='btn'><MdIosShare /></button>
            </div>
        </div>
    )
}