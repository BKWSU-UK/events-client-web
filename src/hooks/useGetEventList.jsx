import { useContext } from 'react'
import EventContext, { extractEventListParameters } from '../context/EventContext'
import { useQuery } from 'react-query'
import { getEventList } from '../service/dataAccess'

const useGetEventList = ({defaultEventLimit}) => {
    const eventContext = useContext(EventContext)
    const eventsConfig = eventContext.eventsConfig
    const allParams = extractEventListParameters({ ...eventContext })
    const { orgId } = allParams
    const orgIdFilter = null

    const eventsLimit = eventsConfig.eventsLimit || defaultEventLimit

    const { isLoading, error, data } = useQuery(
        [
            `eventsSlider_${eventContext.id}`,
            orgId], () => {
            return getEventList({
                orgId,
                eventTypeIds: eventsConfig.eventTypeIds,
                eventsLang: eventsConfig.eventsLang,
                orgIdFilter,
                eventContext,
                useMinimal: true,
                eventsLimit,
            })
        })
    return { isLoading, error, data, eventContext, eventsConfig }
}

export default useGetEventList