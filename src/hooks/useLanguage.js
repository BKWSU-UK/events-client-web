import { useContext } from 'react'
import EventContext from '../context/EventContext'
import { extractParameter } from '../utils/paramExtraction'
import moment from 'moment'

/**
 * Hook used to extract the language.
 */
const useLanguage = () => {
    const eventContext = useContext(EventContext)
    const language = extractParameter({...eventContext}, 'language', 'en-US')
    moment.locale(language)
}

export default useLanguage