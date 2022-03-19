import React, { useContext } from 'react'
import WebcastButton from './WebcastButton'
import { EVENT_DATE_ID } from './EventDisplay'
import {
    fetchEventDateList,
    fetchSimilarEventList,
} from '../service/dataAccess'
import { topFunction } from '../utils/scrolling'
import EventContext from '../context/EventContext'
import {
    extractParameter
} from '../utils/paramExtraction'

/**
 * Changes the state to display the read more screen.
 * @param footerInfo
 * @param setSimilarEvents
 * @param eventContext The event context
 * @returns {Promise<void>}
 */
export const processReadMoreClick = async (footerInfo, setSimilarEvents, eventContext) => {
    const { original } = footerInfo
    const singleEventUrlTemplate = extractParameter({...eventContext}, 'singleEventUrlTemplate')
    if (singleEventUrlTemplate) {
        const eventId = original.id
        window.location.href = singleEventUrlTemplate.replace(
            EVENT_DATE_ID, eventId)
    } else {
        const eventDateId = original.eventDateId
        await fetchSimilarEventList(eventDateId, setSimilarEvents)
        processReadMore(footerInfo)
    }
}

/**
 * Displays the event buttons with show more, book only and webcast.
 * @param footerInfo
 * @returns {JSX.Element}
 * @constructor
 */
const EventButtons = ({ footerInfo }) => {
    const eventContext = useContext(EventContext)
    const { setSimilarEvents } = eventContext
    const {
        original, setCurrentEvent,
        setDisplayForm, setEventTableVisible, t,
    } = footerInfo

    return (
        <div className="event-buttons">
            <button type="button" className="btn btn-info"
                    onClick={() => processReadMoreClick(footerInfo, setSimilarEvents, eventContext)}>{t(
                'read-more')} {original.requiresRegistration ? ' ' +
                t('and-book') : ''}</button>
            {' '}
            {original.requiresRegistration &&
            !extractParameter({...eventContext}, 'suppressBookOnly') ? (
                <button type="button" className="btn btn-info" onClick={() => {
                    setCurrentEvent(original)
                    setDisplayForm(true)
                    setEventTableVisible(false)
                    gotoTop()
                }}>{t('book-only')}
                </button>) : ''}
            {' '}
            <WebcastButton original={original}/>
        </div>
    )
}

const processReadMore = (footerInfo) => {
    const {
        original, setDisplayMoreAbout, setCurrentEvent, setDateList,
        setEventTableVisible, t,
    } = footerInfo
    setDisplayMoreAbout(true)
    setCurrentEvent(original)
    setEventTableVisible(false)
    fetchEventDateList(setDateList, original.id)
    gotoTop()
}

function gotoTop () {
    topFunction()
}

export default EventButtons