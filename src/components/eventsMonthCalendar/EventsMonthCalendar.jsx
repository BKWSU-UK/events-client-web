import React from 'react'
import '../../css/eventMonthList.css'
import {withRouter} from 'react-router-dom'
import {useTranslation} from '../../i18n'
import moment from 'moment-timezone/index'
import {extractEventLinkFunction, extractParameter} from '../../utils/paramExtraction'
import LoadingContainer from '../loading/LoadingContainer'
import EventType from "../EventType";
import useOrganisationEventsWithContext from "../../hooks/useOrganisationEventsWithContext";

function EventDisplay({
                        event, momentStartIso, eventsCalendarFunction,
                        drawIconLine = true
                      }) {

  const {t} = useTranslation()
  const dayOfMonth = momentStartIso.format('D')
  const declinedDayOfMonth = momentStartIso.format('Do')
  const momentEndIso = moment(event.endIso)

  return (
    <>
      <div itemScope itemType="http://schema.org/Event"
           className="m07 ievent first" id="event-calendar">
        {drawIconLine && <div className="icon-line">&nbsp;</div>}
        <div className="datetime" itemProp="startDate">
          <div
            className="date-wrapper">{dayOfMonth}<sup>{declinedDayOfMonth.replace(
            /\d+/g, '')}</sup></div>
          <div className="weekday">{momentStartIso.format('ddd')}</div>
          <div className="time">{momentStartIso.format(
            'h:mm a')} - {momentEndIso.format('h:mm a')}</div>
        </div>
        <div className="calendar-event-online">
          {event.onlineOnly ? t('online_state_Online') :
            event.hasWebcast ? t('online_state_Mixed') :
              t('online_state_In Person')}
        </div>
        <div className="calendar-event-type"><EventType eventTypeInt={event.eventTypeId} useLead={false}/></div>
        <a itemProp="url"
           href={eventsCalendarFunction(event)}
           className="eventLink"><span itemProp="name">{event.name}</span></a>
        {event.requiresRegistration &&
          <div className="booking-required">{t('booking required')}</div>}
      </div>
    </>
  )
}

/**
 * Used to render the events month calendar similar to
 * https://globalcooperationhouse.org/whatson-full
 * @constructor
 */
function EventsMonthCalendar(props) {
  const {events, data, isLoading, error, eventContext, eventsConfig} = useOrganisationEventsWithContext(props)
  const displayYear = extractParameter({...eventContext}, 'showYear')
  const eventsCalendarFunction = extractEventLinkFunction(eventsConfig)
  const locale = extractParameter({...eventContext}, 'language', 'en-US')
  const curMonth = []
  return (
    <div className="container">
      <LoadingContainer data={data} isLoading={isLoading} error={error}>
        <div className="row">
          <div id="t3-content" className="t3-content col-xs-12">
            <div className="events-page">
              {events?.map((event, i) => {
                moment.locale(locale)
                const momentStartIso = moment(event.startIso)
                const month = momentStartIso.format('MMMM')
                const displayMonth = curMonth.length === 0 || curMonth[0] !==
                  month
                if (curMonth.length === 0) {
                  curMonth.push(month)
                } else if (curMonth[0] !== month) {
                  curMonth[0] = month
                }
                const drawIconLine = events.length - 1 !== i &&
                  moment(events[i + 1].startIso).month() ===
                  moment(events[i].startIso).month()
                return (
                  <section key={`${i}_${event.name}`}>
                    {displayMonth &&
                      <h1 className="events-month">{month}{displayYear && ` ${momentStartIso.year()}`}</h1>}
                    <EventDisplay event={event} momentStartIso={momentStartIso}
                                  eventsCalendarFunction={eventsCalendarFunction}
                                  drawIconLine={drawIconLine}/>
                  </section>
                )
              })}
            </div>
          </div>
        </div>
      </LoadingContainer>
    </div>
  )
}

export default withRouter(EventsMonthCalendar)