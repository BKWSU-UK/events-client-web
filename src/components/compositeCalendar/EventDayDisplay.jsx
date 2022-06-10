import React, { useContext } from 'react'
import EventContext from '../../context/EventContext'
import CompositeCalendarContext from '../../context/CompositeCalendarContext'
import { useQuery } from 'react-query'
import { dateToKey } from '../../utils/dateUtils'
import { getEventList } from '../../service/dataAccess'
import LoadingContainer from '../loading/LoadingContainer'
import useTimeFormat from '../../hooks/useTimeFormat'
import { RenderDate } from '../readMore/ReadMore'
import { useTranslation } from '../../i18n'
import EventExtraInfo from './EventExtraInfo'

/**
 * Used to display the events for a single day.
 * @constructor
 */
const EventDateDisplay = () => {

    const { t } = useTranslation()
    const eventContext = useContext(EventContext)
    const compositeCalendarContext = useContext(CompositeCalendarContext)
    const { stateDate } = compositeCalendarContext
    const date = stateDate.selectedSingleDate
    const timeFormat = useTimeFormat()

    const { isLoading, error, data } = useQuery(
        [`${dateToKey(date)}`], () => {
            if (!!date) {
                const eventsConfig = eventContext.eventsConfig
                const orgId = eventsConfig.orgId
                const eventTypeIds = eventsConfig.eventTypeIds
                const eventsLang = eventsConfig.eventsLang
                return getEventList({
                    orgId,
                    eventTypeIds,
                    eventsLang,
                    orgIdFilter: null,
                    eventContext,
                    dateStart: date,
                    dateEnd: date,
                })
            }
            return []
        })

    return (
        <>
            <LoadingContainer data={data} isLoading={isLoading} error={error}>
                <div className="container-fluid">
                    {!!data && data.length > 0 && data?.map((ev, i) => {
                        return (
                            <div className="row" key={i}>
                                <div className="col-12 card">
                                    <div className="card-body">
                                        <h4 key={i}>{ev.name}</h4>
                                        <div><RenderDate date={ev}
                                                         currentEvent={ev}
                                                         timeFormat={timeFormat}
                                                         useIcon={true}/>
                                        </div>
                                        <EventExtraInfo currentEvent={ev}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {!!data && data.length === 0 &&
                    <div>{t('No events found')}</div>}
                </div>
            </LoadingContainer>
        </>
    )
}

export default EventDateDisplay