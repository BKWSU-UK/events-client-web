import React from 'react'
/**
 * Contains multiple calendar views
 * @constructor
 */
import DateStrip from './DateStrip'
import EventDateDisplay from './EventDayDisplay'

/**
 * Calendar used to display events in a period or on a specific day.
 * @returns {JSX.Element}
 * @constructor
 */
const CompositeCalendar = () => {

    return (
        <>
            <DateStrip/>
            <EventDateDisplay />
        </>
    )
}

export default CompositeCalendar