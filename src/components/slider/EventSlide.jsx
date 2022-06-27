import { SplideSlide } from '@splidejs/react-splide'
import React, { useContext, useMemo } from 'react'
import { imageAdapter } from '../../utils/imgUtils'
import EventTypeTitle from '../compositeCalendar/card/EventTypeTitle'
import EventCardTitle from '../compositeCalendar/card/EventCardTitle'
import EventExtraInfo from '../compositeCalendar/card/EventExtraInfo'
import { RenderDate } from '../readMore/ReadMore'
import CompositeCalendarContext, { DATE_ACTIONS } from '../../context/CompositeCalendarContext'

/**
 * Used to display an event in a single slide.
 * @constructor
 */
const EventSlide = ({ event, i, eventsConfig }) => {

    const { dispatchDate } = useContext(CompositeCalendarContext)

    const showEventDate = (e) => {
        e.preventDefault()
        dispatchDate({
            type: DATE_ACTIONS.SHOW_MODAL_EVENT_DATE,
            payload: { modalEventDateId: event.eventDateId },
        })
    }

    const heroImage = useMemo(() => imageAdapter(event, eventsConfig),
        [event.id])

    return (
        <SplideSlide key={i} className="simple-event-slide">
            <div style={{
                background: `url("${heroImage}") center center / cover no-repeat`,
            }} className="calendar-event-image" onClick={showEventDate}/>
            <div className="simple-event-slide-content">
                <EventTypeTitle ev={event}/>
                <EventCardTitle ev={event} showEventDate={showEventDate}/>
                <EventExtraInfo currentEvent={event}/>
                <RenderDate date={event}
                            currentEvent={event}
                            timeFormat={'HH:mm'}
                            useIcon={true}/>
            </div>
        </SplideSlide>
    )
}

export default EventSlide