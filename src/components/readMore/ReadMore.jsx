import React, {useContext} from 'react'
import EventType from '../EventType'
import Venue from '../Venue'
import moment from 'moment-timezone/index'
import makeModal from '../simpleModal/makeModal'
import {IncludeForm} from '../forms/FormModal'
import {useTranslation} from '../../i18n'
import WebcastButton from '../WebcastButton'
import RenderSimilarEvents from './RenderSimilarEvents'
import {extractParameter} from '../../utils/paramExtraction'
import EventContext from '../../context/EventContext'
import useTimeFormat from '../../hooks/useTimeFormat'
import 'moment/locale/de'
import {isSameDay, isSameMoment, renderTimeFromIso, timeAfterNow,} from '../../utils/dateUtils'
import {googleCalendarLink} from '../../utils/googleCalendarUtils'
import SocialIcons from './SocialIcons'

function renderAddToGoogleCalendar(
  event, date, t, useIcon = false, linkText = 'add-google-calendar') {

  return (
    <a href={googleCalendarLink(event, date)}
       target="_blank" rel="nofollow">{!useIcon &&
      t(linkText) || <span>&#128276;</span>} </a>
  )
}

const DEFAULT_UPCOMING_LIMIT = 10

export function RenderDate({
                             date, currentEvent, timeFormat, useIcon = false,
                             useCalendarIcon = true, addGoogleCalendar = true,
                           }) {
  const {eventsConfig} = useContext(EventContext)
  const {t, langCode} = useTranslation()

  const renderEndTimeIfSameDay = () => {
    if (isSameDay(date)) {
      return '-' +
        renderTimeFromIso(date.endIso, langCode, timeFormat)
    }
    return ''
  }

  const startAfterNow = !!timeAfterNow(date.startIso)

  const dateFormat = 'ddd, Do MMM YYYY'

  const startMoment = moment(date.startIso, 'YYYY-MM-DD\'T\'hh:mm:ss')
  const endMoment = moment(date.endIso, 'YYYY-MM-DD\'T\'hh:mm:ss')

  return (
    <div className="row" key={date.eventDateId}>
      <div className="calendar-date-info col-12">
        {useCalendarIcon && <>&#x1f4c5;</>} {startMoment.locale(langCode).format(`${dateFormat} ${timeFormat}`)}
        {renderEndTimeIfSameDay()}
        {!isSameMoment(startMoment, endMoment) &&
          <span> - {endMoment.locale(langCode).format(`${dateFormat} ${timeFormat}`)}</span>}
        <span className="time-from-now">{' '}({moment(date.startIso,
          'YYYY-MM-DD\'T\'hh:mm:ss').locale(langCode).fromNow()})</span>
      </div>
      <div className="col-12 text-right text-nowrap">
        {!!eventsConfig.showGoogleCalendarIcon ?
          (addGoogleCalendar && startAfterNow) &&
          renderAddToGoogleCalendar(currentEvent, date, t, useIcon)
          : currentEvent.locality
        }
      </div>
    </div>
  )
}

function RenderUpcomingDates({dateList, currentEvent, isIntermediate=false}) {

  const {t} = useTranslation()
  if (dateList.length === 0 && !isIntermediate) {
    dateList.push({
      eventDateId: currentEvent.eventDateId,
      endIso: currentEvent.endIso,
      startIso: currentEvent.startIso,
    })
  }
  const eventContext = useContext(EventContext)
  const timeFormat = useTimeFormat()
  moment.locale(extractParameter({...eventContext}, 'language', 'en-US'))
  const upcomingDateLimit = extractParameter({...eventContext},
      'upcomingDateLimit') ||
    DEFAULT_UPCOMING_LIMIT
  if (upcomingDateLimit && Array.isArray(dateList)  && !isIntermediate) {
    dateList = dateList.slice(0, upcomingDateLimit)
  }
  if(Array.isArray(dateList) && dateList.length === 0 && isIntermediate) {
    return <></>
  }
  return (
    <>
      <h4 className={`mt-2 ${isIntermediate && 'ml-4'}`}>
        {isIntermediate ? t('other-sessions') : t('upcoming-dates')}
      </h4>
      <div className={`card card-body bg-light ${isIntermediate && 'ml-4 text-muted'}`}>
        {Array.isArray(dateList) ? dateList.map((date, i) => {
          return (
            <RenderDate date={date} key={`RenderDate_${i}`}
                        currentEvent={currentEvent}
                        timeFormat={timeFormat}/>
          )
        }) : ''}
      </div>
    </>
  )
}

export const venueFactory = (currentEvent) => {
  if (currentEvent.venue) {
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

export const ShowImage = () => {
  const {currentEvent, eventsConfig} = useContext(EventContext)
  const images = [1, 2, 3]
  return (
    <>
      {images.map((imageIndex) => {
        if (!!eventsConfig[`singleEventShowImage${imageIndex}`] &&
          !!currentEvent[`image${imageIndex}`]) {
          return (
            <img
              key={`show_image_${imageIndex}`}
              src={`https://events.brahmakumaris.org${currentEvent[`image${imageIndex}`]}`}
              className="img-fluid" alt={currentEvent.name}/>
          )
        }
      })}
    </>
  )
}

function CalendarFirstDate({dateList, currentEvent, timeFormat}) {
  return <div className="card card-body bg-light mb-2 calendar-first-date">
    {Array.isArray(dateList) && dateList.length > 0 &&
      dateList.slice(0, 1).map((date, i) => {
        return (
          <RenderDate date={date} key={`RenderDate_${i}`}
                      currentEvent={currentEvent}
                      timeFormat={timeFormat}/>
        )
      })}
  </div>
}

/**
 * Displays the extended content about an event.
 * @returns {*}
 * @constructor
 */
export const ReadMore = ({dateList: injectDateList}) => {

  const {currentEvent} = useContext(EventContext)
  const dateList = currentEvent?.dateList ?? injectDateList
  const intermediateDateList = currentEvent?.intermediateDateList ?? []
  const venueEvent = venueFactory(currentEvent)
  const timeFormat = useTimeFormat()

  const tags = new Set(currentEvent.tags?.split(',') ?? [])
  if (venueEvent?.venue) {
    return (
      <>
        {tags.has('hide-title') ? '' : <h2 id="eventDisplayName">{venueEvent.name}</h2>}
        <div className="row">
          <div className={venueEvent.requiresRegistration
            ? 'col-md-6'
            : 'col-md-12'}>
            {tags.has('hide-type') ? '' : <EventType eventTypeInt={venueEvent.eventTypeId}/>}
            {tags.has('hide-date') ? '' : <CalendarFirstDate dateList={dateList}
                                                             currentEvent={currentEvent}
                                                             timeFormat={timeFormat}/>}
            {tags.has('hide-image') ? '' : <ShowImage/>}
            {tags.has('hide-description') ? '' : <p dangerouslySetInnerHTML={{__html: venueEvent.description}}/>}
            {tags.has('hide-webcast') ? '' : <div className="row">
              <div className="col-md-12 webcastButton">
                <WebcastButton original={venueEvent}/></div>
            </div>}

            {tags.has('hide-venue') ? '' : <Venue venue={venueEvent.venue}
                                                  venueName={venueEvent.venue.name}
                                                  venueAddress={venueEvent.venue.address}
                                                  venuePostalCode={venueEvent.venue.postalCode}
                                                  venueLocality={venueEvent.venue.locality}/>}
            {!tags.has('hide-upcoming') && dateList &&
              <RenderUpcomingDates dateList={dateList} currentEvent={venueEvent}/>}
            {!tags.has('hide-intermediate') && dateList &&
              <RenderUpcomingDates dateList={intermediateDateList} currentEvent={venueEvent} isIntermediate={true}/>}
            {tags.has('hide-email') ? '' : <ContactEmail currentEvent={venueEvent}/>}
            {tags.has('hide-social') ? '' : <SocialIcons currentEvent={currentEvent}/>}
            {tags.has('hide-similar') ? '' : <RenderSimilarEvents/>}
          </div>
          {tags.has('hide-form') ? '' : <IncludeForm currentEvent={venueEvent}/>}
        </div>
      </>
    )
  } else {
    return <></>
  }
}

export const ContactEmail = ({currentEvent}) => {
  const {t} = useTranslation()
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