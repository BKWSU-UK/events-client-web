import React, {useState} from 'react';
import {withRouter} from "react-router-dom";
import {fetchEvent} from "../service/dataAccess";
import EventDisplay from "./EventDisplay";

function EventDetail(props) {
    const eventId = props.match.params.eventId;
    const [event, setEvent] = useState({});
    React.useEffect(() => {
        fetchEvent(setEvent, eventId);
    }, [fetchEvent]);
    if (eventId) {
        return (
            <div className="container-fluid">
                <EventDisplay original={event} simple={false} props={props} />
            </div>
        );
    }
}

export default withRouter(EventDetail);