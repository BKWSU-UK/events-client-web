import React from 'react'
import { EventCountdownContextProvider } from '../../context/EventCountdownContext'
import EventCountDownParent from './EventCountDownParent'

/**
 * Wraps the main components with the context.
 * @constructor
 */
const EventCountdownMain = () => {
    return (
        <EventCountdownContextProvider>
            <EventCountDownParent />
        </EventCountdownContextProvider>
    )
}

export default EventCountdownMain