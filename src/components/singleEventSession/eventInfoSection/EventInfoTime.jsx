import React from 'react'
import useEventDateHook from '../useEventDateHook'
import { isSameDay, renderTimeFromIso } from '../../../utils/dateUtils'
import useTimeFormat from '../../../hooks/useTimeFormat'
import EventInfoContainer from './EventInfoContainer'

/**
 * Displays th time
 * @constructor
 */
const EventInfoTime = ({ ev }) => {

    const timeFormat = useTimeFormat()
    const { langCode, eventsConfig, adaptedEventDate } = useEventDateHook(ev)
    const calendaTimeImage = eventsConfig.calendarTimeImage ||
        '/assets/images/calendar_time.png'
    const startTimeExpr = renderTimeFromIso(adaptedEventDate.startIso, langCode,
        timeFormat)

    const renderEndTime = () => {
        return ` - ${renderTimeFromIso(adaptedEventDate.endIso, langCode,
                timeFormat)}`
    }

    return (
        <EventInfoContainer>
            <div className="calendar-flex-icon">
                <img src={calendaTimeImage} alt="19:00 - 20:00"/>
            </div>
            <div>{startTimeExpr}{renderEndTime()}</div>
        </EventInfoContainer>
    )
}

export default EventInfoTime