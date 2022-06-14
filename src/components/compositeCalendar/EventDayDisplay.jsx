import React, { useContext, useEffect, useState } from 'react'
import EventContext from '../../context/EventContext'
import CompositeCalendarContext, {
    CARD_TYPE,
    DATE_ACTIONS,
    ONLINE_STATUS,
} from '../../context/CompositeCalendarContext'
import { useQuery } from 'react-query'
import { dateToKey } from '../../utils/dateUtils'
import { getEventListWithGroupCount } from '../../service/dataAccess'
import LoadingContainer from '../loading/LoadingContainer'
import useTimeFormat from '../../hooks/useTimeFormat'
import { useTranslation } from '../../i18n'
import EventDateCard from './card/EventDateCard'
import EventDateCardWrapper from './EventDateCardWrapper'
import EventDateImageCard from './card/EventDateImageCard'
import { DISPLAY_ONLINE_FILTER, EVENTS_LIMIT } from '../../context/appParams'
import { ONLINE_STATUSES } from '../../context/onlineStates'
import { updateOnlineStatus } from './adapter/onlineAdapter'

const onlineStatusAdapter = (stateDate) => `onlineStatus:${stateDate.onlineStatus}`

/**
 * Used to retrieve a single day of data.
 */
export class SingleDateQueryAdapter {

    createQueryKey = (stateDate) => {
        const date = stateDate.selectedSingleDate
        return `${dateToKey(date)}-${onlineStatusAdapter(stateDate)}`
    }

    callEventList = (stateDate, eventContext) => {
        const date = stateDate.selectedSingleDate
        if (!!date) {
            const eventsConfig = eventContext.eventsConfig
            const orgId = eventsConfig.orgId
            const eventTypeIds = eventsConfig.eventTypeIds
            const eventsLang = eventsConfig.eventsLang
            updateOnlineStatus(stateDate, eventContext)

            return getEventListWithGroupCount({
                orgId,
                eventTypeIds,
                eventsLang,
                orgIdFilter: null,
                eventContext,
                dateStart: date,
                dateEnd: date,
                useMinimal: true,
                eventsLimit: EVENTS_LIMIT,
            })
        }
        return { groupedCount: {}, eventList: [] }
    }
}

/**
 * Used to retrieve a single day of data.
 */
export class MultiDateQueryAdapter {

    createQueryKey = (stateDate) => {
        const startDate = stateDate.visibleDateStart
        const endDate = stateDate.visibleDateEnd
        return `${dateToKey(startDate)}_${dateToKey(
            endDate)}-${onlineStatusAdapter(stateDate)}`
    }

    callEventList = (stateDate, eventContext) => {
        const startDate = stateDate.visibleDateStart
        const endDate = stateDate.visibleDateEnd
        if (!!startDate && !!endDate) {
            const eventsConfig = eventContext.eventsConfig
            const orgId = eventsConfig.orgId
            const eventTypeIds = eventsConfig.eventTypeIds
            const eventsLang = eventsConfig.eventsLang

            updateOnlineStatus(stateDate, eventContext)

            return getEventListWithGroupCount({
                orgId,
                eventTypeIds,
                eventsLang,
                orgIdFilter: null,
                eventContext,
                dateStart: startDate,
                dateEnd: endDate,
                useMinimal: true,
                eventsLimit: EVENTS_LIMIT,
            })
        }
        return { groupedCount: {}, eventList: [] }
    }
}

const DEFAULT_EVENT_LIMIT = 10

/**
 * Used to display the events for a single day and for a time range.
 * @constructor
 */
const EventDateDisplay = ({ adapter }) => {

    const { t } = useTranslation()
    const [eventLimit, setEventLimit] = useState(DEFAULT_EVENT_LIMIT)
    const eventContext = useContext(EventContext)
    const compositeCalendarContext = useContext(CompositeCalendarContext)
    const { stateDate, dispatchDate } = compositeCalendarContext
    const timeFormat = useTimeFormat()

    const { isLoading, error, data } = useQuery(
        [adapter.createQueryKey(stateDate)],
        () => adapter.callEventList(stateDate, eventContext))

    useEffect(() => {
        dispatchDate({
            type: DATE_ACTIONS.SET_DATE_COUNTS,
            payload: { groupedCount: data?.groupedCount },
        })
    }, [data, eventLimit])

    const incrementEventLimit = (e) => {
        e.preventDefault()
        setEventLimit(eventLimit + DEFAULT_EVENT_LIMIT)
    }

    const decrementEventLimit = (e) => {
        e.preventDefault()
        setEventLimit(eventLimit - DEFAULT_EVENT_LIMIT)
    }

    const eventList = data?.eventList?.slice(0, eventLimit)
    const hasMore = data?.eventList?.length > eventLimit
    const hasLess = eventList?.length > DEFAULT_EVENT_LIMIT

    function displayMoreLess(flag, className, func, key) {
        if(flag) {
            return <div className={`${className}`}><a href="#" onClick={func}>{t(key)}</a></div>
        }
    }

    return (
        <>
            <LoadingContainer data={eventList} isLoading={isLoading}
                              error={error}>
                <div className="flex-wrap" style={{ display: 'flex' }}>
                    {!!eventList && eventList.length > 0 &&
                    eventList?.map((ev, i) => {
                        return <EventDateCardWrapper ev={ev}
                                                     timeFormat={timeFormat}
                                                     key={i}>
                            {stateDate.cardType === CARD_TYPE.LONG_CARD ?
                                <EventDateCard/> : <EventDateImageCard/>}
                        </EventDateCardWrapper>
                    })}
                </div>
                {displayMoreLess(hasMore, "calendar-show-more", incrementEventLimit, 'Show more')}
                {displayMoreLess(hasLess, "calendar-show-less", decrementEventLimit, 'Show less')}
                {!!eventList && eventList.length === 0 &&
                !!stateDate.selectedSingleDate &&
                <div>{t('No events found')}</div>}
            </LoadingContainer>
        </>
    )
}



export default EventDateDisplay