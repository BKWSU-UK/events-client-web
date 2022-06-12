import { RenderDate } from '../readMore/ReadMore'
import EventExtraInfo from './EventExtraInfo'
import React, { useContext, useMemo } from 'react'
import CompositeCalendarContext, { DATE_ACTIONS } from '../../context/CompositeCalendarContext'
import { useTranslation } from '../../i18n'
import { timeAfterNow } from '../../utils/dateUtils'
import { extractImageFromEvent } from '../../utils/imgUtils'

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
        <div
            className={`col-12 col-md-6 col-xl-4 col-xxl-3 card ${!startAfterNow && 'calendar-date-past'}`}>
            <div style={{background: `url("${heroImage}") center center / cover no-repeat`, height: "13rem"}} />
            <div className={`${(!!ev.hasWebcast || !!ev.onlineOnly) &&
            'card-online' || !ev.onlineOnly && 'card-in-person'} card-body`}>
                {ev.hasWebcast &&
                <div className="online-notice">{t('online')}</div>}
                {!ev.onlineOnly && <div className="in-person-notice">{t(
                    'online_state_In Person')}</div>}
                <h4><a href="#" onClick={showEventDate} id={ev.id}>{ev.name}</a>
                </h4>
                <div><RenderDate date={ev}
                                 currentEvent={ev}
                                 timeFormat={timeFormat}
                                 useIcon={true}/>
                </div>
                <EventExtraInfo currentEvent={ev}/>
            </div>
        </div>
    )
}

export default EventDateImageCard