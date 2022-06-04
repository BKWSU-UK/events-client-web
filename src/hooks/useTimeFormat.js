import { useContext } from 'react'
import EventContext from '../context/EventContext'
import { determineTimeFormat } from '../components/DateWidget'

const useTimeFormat = () => {
    const eventContext = useContext(EventContext)
    return determineTimeFormat(eventContext)
}

export default useTimeFormat