import React, { createContext, useReducer, useState } from 'react'
import { extractParameter } from '../utils/paramExtraction'
import { ONLINE_STATUSES } from './onlineStates'

export const EVENTS_LANG = 'eventsLang'

export const ALL_ORG_IDS = -1

/**
 * Extracts the filters for the event list
 * @param props Used also for parameter extraction
 * @returns {{featured: *, eventTypeIds: *, orgId: *, lang: "Two-character language code"}}
 */
export const extractEventListParameters = (props) => {
    const orgId = extractParameter(props, 'orgId', 2)
    const eventTypeIds = extractParameter(props, 'eventTypeIds',
        '1,2,3,4,5,6,7,8,9,10,11,12,13,15')
    const featured = extractParameter(props, 'featured', null)
    const eventsLang = extractParameter(props, EVENTS_LANG, null)
    const searchFilterFunction = props.eventsConfig['searchFilterFunction']
    const eventSliceFunction = props.eventsConfig['eventSliceFunction']
    return { orgId, eventTypeIds, featured, eventsLang, searchFilterFunction, eventSliceFunction }
}

/**
 * The context used to keep track of the expansion of the customer and product tables.
 */
const EventContext = createContext()

export const ACTIONS = { CHANGE_ONLINE_STATE: 'CHANGE_ONLINE_STATE' }

const filterReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.CHANGE_ONLINE_STATE:
            return {
                ...state,
                onlineStatus: action.payload.onlineStatus,
            }
    }
}

export const EventContextProvider = (props) => {
    const [events, setEvents] = useState([])
    const [currentEvent, setCurrentEvent] = useState(null)
    const [similarEvents, setSimilarEvents] = useState([])
    const [orgIdFilter, setOrgIdFilter] = useState(ALL_ORG_IDS)
    const [filterState, filterDispatch] = useReducer(filterReducer, {
        onlineStatus: ONLINE_STATUSES.NONE,
    })

    return (
        <EventContext.Provider value={{
            events, setEvents,
            currentEvent, setCurrentEvent,
            similarEvents, setSimilarEvents,
            orgIdFilter, setOrgIdFilter,
            eventsConfig: props.eventsConfig,
            filterState, filterDispatch,
        }}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventContext