/**
 * Displays a single event session.
 * @constructor
 */
import React from 'react'
import '../../css/eventSessionDetail.css'
import NoSessionWarning from './NoSessionWarning'
import { URL_PARAMS } from '../../context/appParams'
import EventSession from './EventSession'
import { extractFromLocationQuery } from '../../utils/urlUtils'

/**
 * The parent component for the single event session.
 * @returns {JSX.Element}
 * @constructor
 */
const EventSessionParent = () => {

    const eventSessionId = extractFromLocationQuery(URL_PARAMS.EVENT_SESSION_ID)
    if(!eventSessionId) {
        return <NoSessionWarning />
    }
    return <EventSession eventSessionId={eventSessionId} />
}

export default EventSessionParent