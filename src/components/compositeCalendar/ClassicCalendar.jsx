import useLanguage from '../../hooks/useLanguage'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import React, { useContext } from 'react'
import EventContext, { extractEventListParameters } from '../../context/EventContext'
import CompositeCalendarContext, { DATE_ACTIONS } from '../../context/CompositeCalendarContext'
import { useQuery } from 'react-query'
import { getEventList } from '../../service/dataAccess'
import { EVENTS_LIMIT } from '../../context/appParams'
import LoadingContainer from '../loading/LoadingContainer'
import { convertToBigCalendar } from '../../service/calendarFactory'
import { updateOnlineStatus } from './adapter/onlineAdapter'

/**
 * Displays a normal calendar.
 * @returns {JSX.Element}
 * @constructor
 */
const ClassicCalendar = ({props}) => {

    const eventContext = useContext(EventContext)
    const { orgIdFilter, filterState } = eventContext
    const allParams = extractEventListParameters({ ...props, ...eventContext })
    const { orgId } = allParams
    const { stateDate, dispatchDate } = useContext(CompositeCalendarContext)
    const startDate = stateDate.visibleDateStart
    const endDate = stateDate.visibleDateEnd
    const eventsConfig = eventContext.eventsConfig
    const eventsLang = eventsConfig.eventsLang
    const eventTypeIds = eventsConfig.eventTypeIds

    const { t } = useLanguage()
    const localizer = momentLocalizer(moment)

    const { isLoading, error, data } = useQuery(
        [
            `eventsCalendar_${eventContext.id}`,
            orgId,
            orgIdFilter,
            filterState,
            startDate,
            endDate,
            stateDate.onlineStatus], () => {
            updateOnlineStatus(stateDate, eventContext)
            return getEventList({
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
        })

    function onNavigate() {
        // Needed to avoid errors
    }

    function onSelectEvent(event) {
        const { original } = event
        console.log('onSelectEvent', original)
        dispatchDate({
            type: DATE_ACTIONS.SHOW_MODAL_EVENT_DATE,
            payload: { modalEventDateId: original.eventDateId },
        })
    }

    return (
        <LoadingContainer data={data} isLoading={isLoading} error={error}>
            <>
                <Calendar
                    date={stateDate.visibleDateStart}
                    onNavigate={onNavigate}
                    localizer={localizer}
                    events={convertToBigCalendar(data)}
                    startAccessor="start"
                    endAccessor="end"
                    messages={{
                        'today': t('today'),
                        'previous': t('previous'),
                        'next': t('next'),
                        'month': t('month'),
                        'week': t('week'),
                        'day': t('day'),
                        'agenda': t('agenda'),
                        'more': t('More'),
                    }}
                    onSelectEvent={onSelectEvent}
                />
            </>
        </LoadingContainer>
    )
}

export default ClassicCalendar