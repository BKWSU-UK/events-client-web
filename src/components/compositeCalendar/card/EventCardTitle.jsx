import React from 'react'

/**
 * The event card title
 * @param ev
 * @param showEventDate
 * @returns {JSX.Element}
 * @constructor
 */
const EventCardTitle = ({ev, showEventDate}) => {
    return <h4 className="calendar-event-title"><a href="#" onClick={showEventDate} id={ev.id}>{ev.name}</a></h4>
}

export default EventCardTitle