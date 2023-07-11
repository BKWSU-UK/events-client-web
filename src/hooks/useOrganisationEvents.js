import { useContext } from 'react'
import EventContext from '../context/EventContext'
import { useQuery } from 'react-query'
import { getEventList } from '../service/dataAccess'
import { extractParameter } from '../utils/paramExtraction'

/**
 * Hook used to retrieve events based on the organisation id coming from a context.
 * @returns {{events}}
 */
export default function useOrganisationEvents (params) {
  const eventContext = useContext(EventContext)
  const { events, setEvents, orgIdFilter, filterState } = eventContext

  const { isLoading, error, data } = useQuery(
    [
      `eventsTable_${eventContext['eventsConfig']['id']}`,
      orgIdFilter,
      filterState],
    () => {
      if (!!orgIdFilter && orgIdFilter > 0) {
        return getEventList({ ...params, orgIdFilter, eventContext })
      } else if (extractParameter({ ...eventContext }, 'fetchEvents')) {
        return getEventList({ ...params, eventContext })
      } else {
        return []
      }
    })

  if (!!data) {
    setEvents(data)
  }

  return { events, eventContext, data, isLoading, error }
}