import React, { useContext } from 'react'
import { EventCountdownContext } from '../../context/EventCountdownContext'
import { DescriptionDisplay } from '../compositeCalendar/EventDateModal'
import EventInfoDate from '../singleEventSession/eventInfoSection/EventInfoDate'
import EventInfoTime from '../singleEventSession/eventInfoSection/EventInfoTime'
import EventInfoType from '../singleEventSession/eventInfoSection/EVentInfoType'
import EventLocation from '../compositeCalendar/card/EventLocation'
import EventOrganisation from '../singleEventSession/EventOrganisation'

/**
 * The event title.
 * @constructor
 */
const EventTitle = () => {
    const { stateCountdownData } = useContext(EventCountdownContext)
    const { data } = stateCountdownData

    if(!data || data.length === 0) {
        return <></>
    }

    const ev = data[0]

    return (
        <div className="container countdown-header">
            <h1>{ev.name}</h1>
            <DescriptionDisplay event={ev} className="calendar-detail-description" />
            <div className="countdown-info">
                <EventOrganisation ev={ev} />
                <EventInfoDate ev={ev} />
                <EventInfoTime ev={ev} />
                <EventInfoType ev={ev} />
            </div>
        </div>
    )
}

export default EventTitle