import { useTranslation } from '../i18n'
import { extractFromLocationQuery } from '../utils/urlUtils'
import React, { useContext } from 'react'
import EventContext from '../context/EventContext'
import { useQuery } from 'react-query'
import { fetchSingleEvent } from '../service/dataAccess'
import Loader from './loading/Loader'

/**
 * Used to render directly either events or forms.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function DetailRenderer (props) {
    const { t } = useTranslation()

    console.log('DetailRenderer props', props)

    const eventId = props?.origProps?.match?.params.eventId ||
        extractFromLocationQuery('eventId') || extractFromLocationQuery('id')

    const { currentEvent, setCurrentEvent } = useContext(EventContext)

    const { isLoading, error, data } = useQuery(
        [`event_${eventId}`], () => fetchSingleEvent(eventId))

    if (data?.data[0]) {
        setCurrentEvent(data.data[0])
    }

    if (isLoading) {
        return <Loader/>
    }
    if(error) {
        return <div>{t('Could not retrieve event due to an error')}</div>
    }
    if (!!currentEvent) {
        return (
            <div className={props?.origProps?.className || "container-fluid"}>
                {props.children}
            </div>
        )
    }
    return <div>{t('No event was found')}</div>
}