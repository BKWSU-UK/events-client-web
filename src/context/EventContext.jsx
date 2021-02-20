import React, { createContext, useState } from 'react'
import { extractParameter } from '../utils/paramExtraction'

export const extractEventListParameters = (props) => {
    const orgId = extractParameter(props, 'orgId', 2);
    const eventTypeIds = extractParameter(props, 'eventTypeIds', "1,2,3,4,5,6,7,8,9,10,11,12,13,15");
    const featured = extractParameter(props, 'featured', null);
    return {orgId, eventTypeIds, featured}
}

/**
 * The context used to keep track of the expansion of the customer and product tables.
 */
const EventContext = createContext();

export const EventContextProvider = (props) => {
    const [events, setEvents] = useState([]);
    return (
        <EventContext.Provider value={{
            events, setEvents
        }}>
            {props.children}
        </EventContext.Provider>
    );
}

export default EventContext;