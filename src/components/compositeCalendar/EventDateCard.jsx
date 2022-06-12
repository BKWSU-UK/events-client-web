import { RenderDate } from '../readMore/ReadMore'
import EventExtraInfo from './EventExtraInfo'
import React, { useContext } from 'react'
import CompositeCalendarContext, { DATE_ACTIONS } from '../../context/CompositeCalendarContext'
import { useTranslation } from '../../i18n'
import { timeAfterNow } from '../../utils/dateUtils'

/**
 * Used to display an event date.
 * @param ev The event
 * @param timeFormat The time format
 * @param showEventDate Used to display the event date.
 * @param startAfterNow
 * @returns {JSX.Element}
 * @constructor
 */
const EventDateCard = ({ ev, timeFormat, showEventDate, startAfterNow }) => {

    const { t } = useTranslation()

    return (
        <div
            className={`col-12 card ${!startAfterNow && 'calendar-date-past'}`}>
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

export default EventDateCard