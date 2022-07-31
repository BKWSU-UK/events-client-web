import React, { useContext } from 'react'
import { EventCountdownContext } from '../../context/EventCountdownContext'
import { DescriptionDisplay } from '../compositeCalendar/EventDateModal'
import EventInfoDate from '../singleEventSession/eventInfoSection/EventInfoDate'
import EventInfoTime from '../singleEventSession/eventInfoSection/EventInfoTime'
import EventInfoType from '../singleEventSession/eventInfoSection/EVentInfoType'
import EventOrganisation from '../singleEventSession/EventOrganisation'
import { processDefaultEmptyArray } from '../../utils/validationUtils'

/**
 * The event title.
 * @constructor
 */
const EventTitle = () => {
    const { stateCountdownData } = useContext(EventCountdownContext)
    const { data } = stateCountdownData

    return processDefaultEmptyArray(data, (data) => {
        const ev = data[0]

        return (
            <div className="container countdown-header">
                <h1>{ev.name}</h1>
                <div className="countdown-info">
                    <EventOrganisation ev={ev} />
                    <EventInfoDate ev={ev} />
                    <EventInfoTime ev={ev} />
                    <EventInfoType ev={ev} />
                </div>
            </div>
        )
    })
}

export default EventTitle