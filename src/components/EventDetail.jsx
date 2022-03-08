import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { fetchEvent } from '../service/dataAccess'
import EventContext from '../context/EventContext'
import { extractFromLocationQuery } from '../utils/urlUtils'
import { ReadMore } from './readMore/ReadMore'

const venueFactory = (currentEvent) => {
    return {
        ...currentEvent,
        venue: {
            name: currentEvent.venueName,
            address: currentEvent.venueAddress,
            postalCode: currentEvent.venuePostCode,
            locality: currentEvent.venueCity,
            country: currentEvent.venueCountry
        }
    }
}

/**
 * Displays an event using the event identifier.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function EventDetail(props) {
    const eventId = props.match.params.eventId || extractFromLocationQuery("eventId") || extractFromLocationQuery("id");
    const {currentEvent, setCurrentEvent} = useContext(EventContext);

    React.useEffect(() => {
        fetchEvent(setCurrentEvent, eventId);
    }, [fetchEvent]);



    if (eventId) {
        return (
            <div className="container-fluid">
                {!!currentEvent && <ReadMore currentEvent={venueFactory(currentEvent)} dateList={currentEvent.dateList}/>}
            </div>
        );
    }
}

export default withRouter(EventDetail);