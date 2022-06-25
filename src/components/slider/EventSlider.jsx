import React, { useContext } from 'react'
import EventContext from '../../context/EventContext'

/**
 * Slider which displays events for a specific centers (or locations)
 * @returns {JSX.Element}
 * @constructor
 */
const EventSlider = () => {
    const eventContext = useContext(EventContext)
    const { orgIdFilter } = eventContext

    return (
        <></>
    )
}

export default EventSlider