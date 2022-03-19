import React, { useContext } from 'react'
import EventType from '../EventType'
import Venue from '../Venue'
import moment from 'moment-timezone/index'
import makeModal from '../simpleModal/makeModal'
import { createForm } from '../forms/FormModal'
import { useTranslation } from '../../i18n'
import WebcastButton from '../WebcastButton'
import RenderSimilarEvents from './RenderSimilarEvents'
import { determineTimeFormat } from '../DateWidget'
import {
    extractParameter
} from '../../utils/paramExtraction'
import EventContext from '../../context/EventContext'

function convertIsoToGoogleCal (dateStr) {
    return moment(dateStr, 'YYYY-MM-DD\'T\'hh:mm:ss').format('YYYYMMDDTHHmmss')
}

function renderAddToGoogleCalendar (event, date, t) {
    const venue = event.venue
    return (
        <a href={`http://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURI(
            event.name)}&dates=${convertIsoToGoogleCal(
            date.startIso)}Z/${convertIsoToGoogleCal(
            date.endIso)}Z&details=${encodeURI(
            event.descriptionText)}&location=${encodeURI(
            venue.address)}&trp=false&sf=true&output=xml`}
           target="_blank" rel="nofollow">{t('add-google-calendar')}</a>
    )
}

function includeForm (currentEvent, eventContext) {
    return (
        <>
            {currentEvent.requiresRegistration && <div className="col-md-6">
                {createForm(currentEvent, eventContext)}
            </div>}
        </>
    )
}

const DEFAULT_UPCOMING_LIMIT = 10

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
    const timeFormat = determineTimeFormat(eventContext)
    moment.locale(extractParameter({...eventContext},'language', 'en-US'));
    const upcomingDateLimit = extractParameter({...eventContext}, 'upcomingDateLimit') ||
        DEFAULT_UPCOMING_LIMIT
    if (upcomingDateLimit && Array.isArray(dateList)) {
        console.log('type dateList', typeof dateList)
        dateList = dateList.slice(0, upcomingDateLimit)
    }
    return (
        <>
            <h4>
                {t('upcoming-dates')}
            </h4>
            <div className="card card-body bg-light">
                {Array.isArray(dateList) ? dateList.map(date => {
                    return (
                        <div className="row" key={date.eventDateId}>
                            <div className="col-12 col-md-3">
                                &#x1f4c5; {moment(date.startIso,
                                'YYYY-MM-DD\'T\'hh:mm:ss').
                                format(`Do MMM YYYY ${timeFormat}`)}
                            </div>
                            <div className="col-12 col-md-3">
                                ({moment(date.startIso,
                                'YYYY-MM-DD\'T\'hh:mm:ss').fromNow()})
                            </div>
                            <div className="col-12 col-md-6">
                                {renderAddToGoogleCalendar(currentEvent, date,
                                    t)}
                            </div>
                        </div>
                    )
                }) : ''}
            </div>
        </>
    )
}

/**
 * Displays the extended content about an event.
 * @returns {*}
 * @constructor
 */
export function ReadMore ({ currentEvent, dateList }) {
    const { t } = useTranslation()
    const eventContext = useContext(EventContext)
    if (currentEvent?.venue) {
        return (
            <>
                <h2 id="eventDisplayName">{currentEvent.name}</h2>
                <div className="row">
                    <div className={currentEvent.requiresRegistration
                        ? 'col-md-6'
                        : 'col-md-12'}>
                        <EventType eventTypeInt={currentEvent.eventTypeId}/>
                        <p dangerouslySetInnerHTML={{ __html: currentEvent.description }}/>
                        <div className="row">
                            <div className="col-md-12 webcastButton">
                                <WebcastButton original={currentEvent}/></div>
                        </div>

                        <Venue venue={currentEvent.venue}
                               venueName={currentEvent.venue.name}
                               venueAddress={currentEvent.venue.address}
                               venuePostalCode={currentEvent.venue.postalCode}
                               venueLocality={currentEvent.venue.locality}/>
                        {dateList && <RenderUpcomingDates dateList={dateList}
                                                          currentEvent={currentEvent}/>}
                        <RenderSimilarEvents/>
                    </div>
                    {includeForm(currentEvent, eventContext)}
                </div>
            </>
        )
    } else {
        return <></>
    }
}

const ReadMoreModal = makeModal(ReadMore)

export default ReadMoreModal