import React, { useContext, useEffect, useState } from 'react'
import EventContext from '../../context/EventContext'
import CompositeCalendarContext, {
    CARD_TYPEUI_VIEW,
    DATE_ACTIONS,
} from '../../context/CompositeCalendarContext'
import { useQuery } from 'react-query'
import { dateToKey } from '../../utils/dateUtils'
import {
    getCombinedEventListWithGroupCount,
    getEventListWithGroupCount,
} from '../../service/dataAccess'
import LoadingContainer from '../loading/LoadingContainer'
import useTimeFormat from '../../hooks/useTimeFormat'
import { useTranslation } from '../../i18n'
import EventDateCard from './card/EventDateCard'
import EventDateCardWrapper from './EventDateCardWrapper'
import EventDateImageCard from './card/EventDateImageCard'
import { EVENTS_LIMIT } from '../../context/appParams'
import { updateOnlineStatus } from './adapter/onlineAdapter'
import { eventTypeIdAdapter } from './adapter/eventTypeIdAdapter'

const onlineStatusAdapter = (stateCalendar) => `onlineStatus:${stateCalendar.onlineStatus}`

/**
 * Used to retrieve a single day of data.
 */
export class SingleDateQueryAdapter {

    createQueryKey = (stateCalendar) => {
        const date = stateCalendar.selectedSingleDate
        return `${dateToKey(date)}-${onlineStatusAdapter(stateCalendar)}-category_${stateCalendar.categoryFilter}`
    }

    callEventList = (stateCalendar, eventContext) => {
        const date = stateCalendar.selectedSingleDate
        if (!!date) {
            const eventsConfig = eventContext.eventsConfig
            const orgId = eventsConfig.orgId
            const eventTypeIds = eventTypeIdAdapter(stateCalendar, eventsConfig.eventTypeIds)
            const eventsLang = eventsConfig.eventsLang
            updateOnlineStatus(stateCalendar, eventContext)

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
                marker: 'single'
            })
        }
        return { groupedCount: {}, eventList: [] }
    }

    updateGroupCount = () => {}

    limitResults = (eventList) => eventList
}

/**
 * Used to retrieve a single day of data.
 */
export class MultiDateQueryAdapter {

    createQueryKey = (stateCalendar) => {
        const startDate = stateCalendar.visibleDateStart
        const endDate = stateCalendar.visibleDateEnd
        return `${dateToKey(startDate)}_${dateToKey(
            endDate)}-${onlineStatusAdapter(stateCalendar)}-category_${stateCalendar.categoryFilter}`
    }

    callEventList = (stateCalendar, eventContext) => {
        const startDate = stateCalendar.visibleDateStart
        const endDate = stateCalendar.visibleDateEnd
        if (!!startDate && !!endDate) {
            const eventsConfig = eventContext.eventsConfig
            const orgId = eventsConfig.orgId
            const eventTypeIds = eventTypeIdAdapter(stateCalendar, eventsConfig.eventTypeIds)
            const eventsLang = eventsConfig.eventsLang

            updateOnlineStatus(stateCalendar, eventContext)

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

    updateGroupCount = (dispatchDate, data) => {
        dispatchDate({
            type: DATE_ACTIONS.SET_DATE_COUNTS,
            payload: { groupedCount: data?.groupedCount }
        })
    }

    limitResults = (eventList) => eventList
}

export class SingleDayQueryAdapter extends MultiDateQueryAdapter {

    limitResults = (eventList, stateCalendar) => {
        const selectedSingleDate = stateCalendar.selectedSingleDate
        if(!selectedSingleDate) {
            return []
        }
        const day = selectedSingleDate.getDate()
        const month = selectedSingleDate.getMonth() + 1
        const year = selectedSingleDate.getFullYear()
        return eventList?.filter(e => {
            const splits = e.startDate.split('-')
            return parseInt(splits[0]) === year && parseInt(splits[1]) === month &&
                parseInt(splits[2]) === day
        }) || []
    }

    callEventList = (stateCalendar, eventContext) => {
        const startDate = stateCalendar.visibleDateStart
        const endDate = stateCalendar.visibleDateEnd
        if (!!startDate && !!endDate) {
            const eventsConfig = eventContext.eventsConfig
            const orgId = eventsConfig.orgId
            const eventTypeIds = eventTypeIdAdapter(stateCalendar, eventsConfig.eventTypeIds)
            const eventsLang = eventsConfig.eventsLang

            updateOnlineStatus(stateCalendar, eventContext)
            const params1 = {
                orgId,
                eventTypeIds,
                eventsLang,
                orgIdFilter: null,
                eventContext,
                dateStart: stateCalendar.selectedSingleDate,
                dateEnd: stateCalendar.selectedSingleDate,
                useMinimal: true,
                eventsLimit: EVENTS_LIMIT,
            }
            const params2 = {
                orgId,
                eventTypeIds,
                eventsLang,
                orgIdFilter: null,
                eventContext,
                dateStart: startDate,
                dateEnd: endDate,
                useMinimal: true,
                eventsLimit: EVENTS_LIMIT,
            }

            return getCombinedEventListWithGroupCount(params1, params2)
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
    const { stateCalendar, dispatchDate } = compositeCalendarContext
    const timeFormat = useTimeFormat()

    const { isLoading, error, data } = useQuery(
        [adapter.createQueryKey(stateCalendar), stateCalendar.cardType],
        () => adapter.callEventList(stateCalendar, eventContext))

    useEffect(() => {
        adapter.updateGroupCount(dispatchDate, data)
    }, [data, eventLimit, stateCalendar.cardType])

    const incrementEventLimit = (e) => {
        e.preventDefault()
        setEventLimit(eventLimit + DEFAULT_EVENT_LIMIT)
    }

    const decrementEventLimit = (e) => {
        e.preventDefault()
        setEventLimit(eventLimit - DEFAULT_EVENT_LIMIT)
    }

    let eventList = adapter.limitResults(data?.eventList, stateCalendar)
    const hasMore = eventList?.length > eventLimit
    const hasLess = eventLimit > DEFAULT_EVENT_LIMIT
    eventList = eventList?.slice(0, eventLimit)

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
                    eventList.map((ev, i) => {
                        return <EventDateCardWrapper ev={ev}
                                                     timeFormat={timeFormat}
                                                     key={i}>
                            {[CARD_TYPEUI_VIEW.LONG_CARD].includes(stateCalendar.cardType)  ?
                                <EventDateCard/> : <EventDateImageCard/>}
                        </EventDateCardWrapper>
                    })}
                </div>
                {displayMoreLess(hasMore, "calendar-show-more", incrementEventLimit, 'Show more')}
                {displayMoreLess(hasLess, "calendar-show-less", decrementEventLimit, 'Show less')}
                {!!eventList && eventList.length === 0 &&
                !!stateCalendar.selectedSingleDate &&
                <div>{t('No events found')}</div>}
            </LoadingContainer>
        </>
    )
}



export default EventDateDisplay