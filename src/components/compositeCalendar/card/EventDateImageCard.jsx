import { RenderDate } from '../../readMore/ReadMore'
import EventExtraInfo from './EventExtraInfo'
import React, { useMemo } from 'react'
import { useTranslation } from '../../../i18n'
import { extractImageFromEvent } from '../../../utils/imgUtils'
import OnlineNotice from './OnlineNotice'
import { eventMap } from '../../../service/dataAccessConstants'

/**
 * Used to display an event date.
 * @param ev The event
 * @param timeFormat The time format
 * @param showEventDate Used to display the event date.
 * @param startAfterNow
 * @returns {JSX.Element}
 * @constructor
 */
const EventDateImageCard = ({ ev, timeFormat, showEventDate, startAfterNow }) => {

    const { t } = useTranslation()

    const selectImage = () => {
        const image = extractImageFromEvent(ev)
        if (!!image) {
            return image
        }
        const randomImages = window.eventsConfig[0].randomImages
        if(!!randomImages) {
            return randomImages[Math.floor(Math.random() * randomImages.length)]
        }
        return null
    }

    const heroImage = useMemo(() => selectImage(), [ev.id])

    return (
        <div className="col-12 col-md-6 col-xl-3 calendar-event-card-wrapper">
            <div
                className={`card ${!startAfterNow && 'calendar-date-past'}`}>
                <div style={{
                    background: `url("${heroImage}") center center / cover no-repeat`
                }} className="calendar-event-image" onClick={showEventDate} />
                <div className={`${(!!ev.hasWebcast || !!ev.onlineOnly) &&
                'card-online' || !ev.onlineOnly && 'card-in-person'} card-body`}>
                    <OnlineNotice ev={ev} />
                    <h6>{t(eventMap[ev?.eventTypeId])}</h6>
                    <h4><a href="#" onClick={showEventDate} id={ev.id}>{ev.name}</a>
                    </h4>
                    <EventExtraInfo currentEvent={ev}/>
                    <div className="calendar-event-datetime">
                        <RenderDate date={ev}
                                     currentEvent={ev}
                                     timeFormat={timeFormat}
                                     useIcon={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventDateImageCard