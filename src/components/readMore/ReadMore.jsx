import React, { useContext } from 'react'
import EventType from '../EventType'
import Venue from '../Venue'
import moment from 'moment-timezone/index'
import makeModal from '../simpleModal/makeModal'
import { IncludeForm } from '../forms/FormModal'
import { useTranslation } from '../../i18n'
import WebcastButton from '../WebcastButton'
import RenderSimilarEvents from './RenderSimilarEvents'
import { extractParameter } from '../../utils/paramExtraction'
import EventContext from '../../context/EventContext'
import useTimeFormat from '../../hooks/useTimeFormat'
import 'moment/locale/de'
import {
    isSameDay,
    renderTimeFromIso,
    timeAfterNow,
} from '../../utils/dateUtils'
import { googleCalendarLink } from '../../utils/googleCalendarUtils'

function renderAddToGoogleCalendar (event, date, t, useIcon = false, linkText = 'add-google-calendar') {

    return (
        <a href={googleCalendarLink(event, date)}
           target="_blank" rel="nofollow">{!useIcon &&
        t(linkText) || <span>&#128276;</span>} </a>
    )
}

const DEFAULT_UPCOMING_LIMIT = 10

export function RenderDate ({
    date, currentEvent, timeFormat, useIcon = false,
    useCalendarIcon = true, addGoogleCalendar = true
}) {
    const { t, langCode } = useTranslation()

    const renderEndTimeIfSameDay = () => {
        if (isSameDay(date)) {
            return '-' +
                renderTimeFromIso(date.endIso, langCode, timeFormat)
        }
        return ''
    }

    const startAfterNow = !!timeAfterNow(date.startIso)

    return (
        <div className="row" key={date.eventDateId}>
            <div className="calendar-date-info col-10">
                {useCalendarIcon && <>&#x1f4c5;</>} {moment(date.startIso,
                'YYYY-MM-DD\'T\'hh:mm:ss').locale(langCode).
                format(`Do MMMM YYYY ${timeFormat}`)}{renderEndTimeIfSameDay()}
                <span className="time-from-now">{' '}{moment(date.startIso,
                    'YYYY-MM-DD\'T\'hh:mm:ss').
                    locale(langCode).
                    fromNow()}</span>
            </div>
            {addGoogleCalendar && startAfterNow && <div className="col-2 text-right">
                {renderAddToGoogleCalendar(currentEvent, date, t, useIcon)}
            </div>}
        </div>
    )
}

function RenderUpcomingDates ({ dateList, currentEvent }) {

    const { t } = useTranslation()
    if (dateList.length === 0) {
        dateList.push({
            eventDateId: currentEvent.eventDateId,
            endIso: currentEvent.endIso,
            startIso: currentEvent.startIso,
        })
    }
    const eventContext = useContext(EventContext)
    const timeFormat = useTimeFormat()
    moment.locale(extractParameter({ ...eventContext }, 'language', 'en-US'))
    const upcomingDateLimit = extractParameter({ ...eventContext },
        'upcomingDateLimit') ||
        DEFAULT_UPCOMING_LIMIT
    if (upcomingDateLimit && Array.isArray(dateList)) {
        console.log('type dateList', typeof dateList)
        dateList = dateList.slice(0, upcomingDateLimit)
    }
    return (
        <>
            <h4 className="mt-2">
                {t('upcoming-dates')}
            </h4>
            <div className="card card-body bg-light">
                {Array.isArray(dateList) ? dateList.map(date => {
                    return (
                        <RenderDate date={date} currentEvent={currentEvent}
                                    timeFormat={timeFormat}/>
                    )
                }) : ''}
            </div>
        </>
    )
}

export const venueFactory = (currentEvent) => {
    if(currentEvent.venue) {
        return {...currentEvent}
    }
    return {
        ...currentEvent,
        venue: {
            name: currentEvent.venueName,
            address: currentEvent.venueAddress,
            postalCode: currentEvent.venuePostCode,
            locality: currentEvent.venueCity,
            country: currentEvent.venueCountry,
        },
    }
}

/**
 * Displays the extended content about an event.
 * @returns {*}
 * @constructor
 */
export const ReadMore = () => {

    const { currentEvent } = useContext(EventContext)
    const dateList = currentEvent?.dateList
    const venueEvent = venueFactory(currentEvent)

    if (venueEvent?.venue) {
        return (
            <>
                <h2 id="eventDisplayName">{venueEvent.name}</h2>
                <div className="row">
                    <div className={venueEvent.requiresRegistration
                        ? 'col-md-6'
                        : 'col-md-12'}>
                        <EventType eventTypeInt={venueEvent.eventTypeId}/>
                        <p dangerouslySetInnerHTML={{ __html: venueEvent.description }}/>
                        <div className="row">
                            <div className="col-md-12 webcastButton">
                                <WebcastButton original={venueEvent}/></div>
                        </div>

                        <Venue venue={venueEvent.venue}
                               venueName={venueEvent.venue.name}
                               venueAddress={venueEvent.venue.address}
                               venuePostalCode={venueEvent.venue.postalCode}
                               venueLocality={venueEvent.venue.locality}/>
                        {dateList && <RenderUpcomingDates dateList={dateList}
                                                          currentEvent={venueEvent}/>}
                        <ContactEmail currentEvent={venueEvent}/>
                        <RenderSimilarEvents/>
                    </div>
                    <IncludeForm currentEvent={venueEvent}/>
                </div>
            </>
        )
    } else {
        return <></>
    }
}

export const ContactEmail = ({ currentEvent }) => {
    const { t } = useTranslation()
    const contactEmail = currentEvent.contactEmail
    if (!!contactEmail) {
        return (
            <div className="contact-email">
                <h4 className="card-title mt-2">{t('Contact Email')}</h4>
                <div className="card mt-2">
                    <div className="card-body bg-light">
                        <p className="card-text">&#128231;{' '}<a
                            href={`mailto:${contactEmail}`}>{contactEmail}</a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
    return <></>

}

const ReadMoreModal = makeModal(ReadMore)

export default ReadMoreModal