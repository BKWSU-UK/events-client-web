import React, { useMemo } from 'react'
import EventCardTitle from '../compositeCalendar/card/EventCardTitle'
import { imageAdapter } from '../../utils/imgUtils'
import { RenderDate } from '../readMore/ReadMore'
import useTimeFormat from '../../hooks/useTimeFormat'

/**
 * Small tile.
 * @constructor
 */
const SmallTile = ({ ev, showEventDate }) => {

    const heroImage = useMemo(() => imageAdapter(ev, window.eventsConfig[0]),
        [ev.id])
    const timeFormat = useTimeFormat()

    const myShowEventDate = (e) => {
        showEventDate(e, ev)
    }

    return (
        <div className="tiles-grid-2">
            <div className="tiles-grid-img"
                 style={{ background: `url("${heroImage}") center center / cover no-repeat` }}
                 onClick={myShowEventDate}>
            </div>
            <div className="events-text">
                <EventCardTitle ev={ev} showEventDate={myShowEventDate}/>
                <RenderDate date={ev}
                            currentEvent={ev}
                            timeFormat={timeFormat}
                            useCalendarIcon={false}
                            addGoogleCalendar={false} />
            </div>
        </div>
    )
}

export default SmallTile