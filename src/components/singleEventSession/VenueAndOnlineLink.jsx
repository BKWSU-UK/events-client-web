import React from 'react'
import { VenueDisplay } from '../compositeCalendar/EventDateModal'

/**
 * Venue and online link.
 * @constructor
 */
const VenueAndOnlineLink = ({ev}) => {
    const inperson = !ev.onlineOnly
    const online = ev.hasWebcast && ev.webcastUrl.match(/https:\/\/.+/)

    return (
        <>
            {inperson && <VenueDisplay event={ev}/>}
            {online && (
                <div className="row calendar-detail-onlinelink">
                    <div className="col-12 card card-body bg-light">
                        <a href={ev.webcastUrl}>{ev.webcastUrl}</a>
                    </div>
                </div>
            )}
        </>
    )
}

export default VenueAndOnlineLink