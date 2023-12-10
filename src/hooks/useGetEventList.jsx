import {useContext} from 'react'
import EventContext, {extractEventListParameters} from '../context/EventContext'

import {getEventList} from '../service/dataAccess'
import {useQuery} from "@tanstack/react-query";

const useGetEventList = ({defaultEventLimit}) => {
  const eventContext = useContext(EventContext)
  const eventsConfig = eventContext.eventsConfig
  const allParams = extractEventListParameters({...eventContext})
  const {orgId} = allParams
  const orgIdFilter = null

  const eventsLimit = eventsConfig.eventsLimit || defaultEventLimit

  const {isLoading, error, data} = useQuery({
    'queryKey': [
      `eventsSlider_${eventContext.id}`,
      orgId], 'queryFn': () => {
      return getEventList({
        orgId,
        eventTypeIds: eventsConfig.eventTypeIds,
        eventsLang: eventsConfig.eventsLang,
        orgIdFilter,
        eventContext,
        useMinimal: true,
        eventsLimit,
      })
    }
  })
  return {isLoading, error, data, eventContext, eventsConfig}
}

export default useGetEventList