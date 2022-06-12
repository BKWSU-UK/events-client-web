import React, { useContext, useEffect, useState } from 'react'
import EventContext from '../../context/EventContext'
import CompositeCalendarContext, {
    CARD_TYPE,
    DATE_ACTIONS,
} from '../../context/CompositeCalendarContext'
import { useQuery } from 'react-query'
import { dateToKey } from '../../utils/dateUtils'
import { getEventListWithGroupCount } from '../../service/dataAccess'
import LoadingContainer from '../loading/LoadingContainer'
import useTimeFormat from '../../hooks/useTimeFormat'
import { useTranslation } from '../../i18n'
import EventDateCard from './EventDateCard'
import EventDateCardWrapper from './EventDateCardWrapper'
import EventDateImageCard from './EventDateImageCard'

const EVENTS_LIMIT = 1000

/**
 * Used to retrieve a single day of data.
 */
export class SingleDateQueryAdapter {
    constructor () {}

    createQueryKey = (stateDate) => {
        const date = stateDate.selectedSingleDate
        return `${dateToKey(date)}`
    }

    callEventList = (stateDate, eventContext) => {
        const date = stateDate.selectedSingleDate
        if (!!date) {
            const eventsConfig = eventContext.eventsConfig
            const orgId = eventsConfig.orgId
            const eventTypeIds = eventsConfig.eventTypeIds
            const eventsLang = eventsConfig.eventsLang
            return getEventListWithGroupCount({
                orgId,
                eventTypeIds,
                eventsLang,
                orgIdFilter: null,
                eventContext,
                dateStart: date,
                dateEnd: date,
                useMinimal: true,
                eventsLimit: EVENTS_LIMIT
            })
        }
        return {groupedCount: {}, envList: []}
    }
}

/**
 * Used to retrieve a single day of data.
 */
export class MultiDateQueryAdapter {
    constructor () {}

    createQueryKey = (stateDate) => {
        const startDate = stateDate.visibleDateStart
        const endDate = stateDate.visibleDateEnd
        return `${dateToKey(startDate)}_${dateToKey(endDate)}`
    }

    callEventList = (stateDate, eventContext) => {
        const startDate = stateDate.visibleDateStart
        const endDate = stateDate.visibleDateEnd
        if (!!startDate && !!endDate) {
            const eventsConfig = eventContext.eventsConfig
            const orgId = eventsConfig.orgId
            const eventTypeIds = eventsConfig.eventTypeIds
            const eventsLang = eventsConfig.eventsLang
            return getEventListWithGroupCount({
                orgId,
                eventTypeIds,
                eventsLang,
                orgIdFilter: null,
                eventContext,
                dateStart: startDate,
                dateEnd: endDate,
                useMinimal: true,
                eventsLimit: EVENTS_LIMIT
            })
        }
        return {groupedCount: {}, envList: []}
    }
}

const DEFAULT_EVENT_LIMIT = 10

/**
 * Used to display the events for a single day.
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
        dispatchDate({type: DATE_ACTIONS.SET_DATE_COUNTS, payload: {groupedCount: data?.groupedCount}})
    }, [data, eventLimit])

    const incrementEventLimit = (e) => {
        e.preventDefault()
        setEventLimit(eventLimit + DEFAULT_EVENT_LIMIT)
    }

    const decrementEventLimit = (e) => {
        e.preventDefault()
        setEventLimit(eventLimit - DEFAULT_EVENT_LIMIT)
    }

    const envList = data?.envList?.slice(0, eventLimit)
    const hasMore = data?.envList?.length > eventLimit
    const hasLess = envList?.length > DEFAULT_EVENT_LIMIT

    return (
        <>
            <LoadingContainer data={envList} isLoading={isLoading} error={error}>
                <div className="flex-wrap" style={{display: 'flex'}}>
                {!!envList && envList.length > 0 && envList?.map((ev, i) => {
                    return <EventDateCardWrapper ev={ev} timeFormat={timeFormat} key={i}>
                        {stateDate.cardType === CARD_TYPE.LONG_CARD ? <EventDateCard/> : <EventDateImageCard />}
                    </EventDateCardWrapper>
                })}
                </div>
                {!!hasLess && <div className="calendar-show-less"><a href="#" onClick={decrementEventLimit}>{t('Show less')}</a></div>}
                {!!hasMore && <div className="calendar-show-more"><a href="#" onClick={incrementEventLimit}>{t('Show more')}</a></div>}
                {!!envList && envList.length === 0 && !!stateDate.selectedSingleDate &&
                <div>{t('No events found')}</div>}
            </LoadingContainer>
        </>
    )
}

export default EventDateDisplay