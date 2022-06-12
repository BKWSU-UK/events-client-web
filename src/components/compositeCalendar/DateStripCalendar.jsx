import React from 'react'
/**
 * Contains multiple calendar views
 * @constructor
 */
import DateStrip from './dateStrip/DateStrip'
import EventDateDisplay, {
    MultiDateQueryAdapter,
    SingleDateQueryAdapter,
} from './EventDayDisplay'
import DatePeriod from './DatePeriod'
import SingleDateTitle from './SingleDateTitle'
import EventDateModal from './EventDateModal'

/**
 * Calendar used to display events in a period or on a specific day.
 * @returns {JSX.Element}
 * @constructor
 */
const DateStripCalendar = () => {

    return (
        <div className="container-fluid">
            <DateStrip/>
            <SingleDateTitle />
            <EventDateDisplay adapter={new SingleDateQueryAdapter()} />
            <DatePeriod />
            <EventDateDisplay adapter={new MultiDateQueryAdapter()} />
            <EventDateModal />
        </div>
    )
}

export default DateStripCalendar