import React, { createContext, useState } from 'react'
import { extractParameter } from '../utils/paramExtraction'

export const EVENTS_LANG = 'eventsLang'

/**
 * Extracts the filters for the event list
 * @param props Used also for parameter extraction
 * @returns {{featured: *, eventTypeIds: *, orgId: *, lang: "Two-character language code"}}
 */
export const extractEventListParameters = (props) => {
    const orgId = extractParameter(props, 'orgId', 2);
    const eventTypeIds = extractParameter(props, 'eventTypeIds', "1,2,3,4,5,6,7,8,9,10,11,12,13,15");
    const featured = extractParameter(props, 'featured', null);
    const eventsLang = extractParameter(props, EVENTS_LANG, null);
    console.log('eventsLang', eventsLang)
    return {orgId, eventTypeIds, featured, eventsLang}
}

/**
 * The context used to keep track of the expansion of the customer and product tables.
 */
const EventContext = createContext();

export const EventContextProvider = (props) => {
    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState({});
    const [similarEvents, setSimilarEvents] = useState([]);
    return (
        <EventContext.Provider value={{
            events, setEvents,
            event, setEvent,
            similarEvents, setSimilarEvents
        }}>
            {props.children}
        </EventContext.Provider>
    );
}

export default EventContext;