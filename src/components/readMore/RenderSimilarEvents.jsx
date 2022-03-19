import React, { useContext } from 'react'
import EventContext from '../../context/EventContext'
import { extractParameter } from '../../utils/paramExtraction'
import { useTranslation } from '../../i18n'
import { eventMap } from '../EventDisplay'
import { determineTimeFormat, momentFactory } from '../DateWidget'
import { fetchSimilarEventList } from '../../service/dataAccess'

const createDateStr = (dateStr, time) => `${dateStr} ${time}`.replace(/:00$/, "")



/**
 * Simple component used to render similar events.
 * @returns {*|boolean|JSX.Element}
 * @constructor
 */
const RenderSimilarEvents = () => {
    const eventContext = useContext(EventContext)
    const { setCurrentEvent, events, similarEvents, setSimilarEvents } = eventContext
    const { t } = useTranslation()
    const showSimilarEvents = extractParameter({...eventContext}, 'showSimilarEvents', false)

    const switchEvents = (e, eventDateId) => {
        e.preventDefault()
        const selectedEvents = events.filter(ev => ev.eventDateId === eventDateId)
        console.log('Chosen similarity id', eventDateId)
        if(selectedEvents && selectedEvents.length > 0) {
            setCurrentEvent(selectedEvents[0])
            fetchSimilarEventList(eventDateId, setSimilarEvents)
        }
    }

    if (showSimilarEvents) {
        return (
            similarEvents && similarEvents.length > 0 &&
            <>
                <h4>{t('Similar Events')}</h4>
                <div className="card card-body bg-light">
                    {similarEvents.map((event, i) => {
                        const startDate = createDateStr(event.startDateStr, event.startTime);
                        const endDate = createDateStr(event.endDateStr, event.endTime);
                        const timezone = event.timezone;
                        const baseMoment = momentFactory(startDate, timezone);
                        const baseEndMoment = momentFactory(endDate, timezone);
                        const timeFormat = determineTimeFormat(eventContext)
                        return (
                            <div className="row" key={i}>
                                <div className="col-sm-12 similar-title">
                                    <h5><a href="#" onClick={(e) => switchEvents(e, event.eventDateId)}>{event.eventName}</a></h5>
                                </div>
                                <div className="col-sm-12">
                                    <h6>{t(eventMap[event.eventTypeId])}</h6>
                                </div>
                                <div className="col-sm-12">
                                    &#x1f4c5; {baseMoment.format(`ddd, Do MMM YYYY ${timeFormat}`)}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
    return <></>
}

export default RenderSimilarEvents