import React from "react";
import EventType from "./EventType";
import Venue from "./Venue";
import moment from "moment";
import makeModal from "./simpleModal/makeModal";
import {EventForm, createForm} from "./forms/FormModal";
import {useTranslation} from "../i18n";

function convertIsoToGoogleCal(dateStr) {
    return moment(dateStr, "YYYY-MM-DD'T'hh:mm:ss").format("YYYYMMDDTHHmmss");
}

function renderAddToGoogleCalendar(event, date) {
    const venue = event.venue;
    return (
        <a href={`http://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURI(event.name)}&dates=${convertIsoToGoogleCal(date.startIso)}Z/${convertIsoToGoogleCal(date.endIso)}Z&details=${encodeURI(event.descriptionText)}&location=${encodeURI(venue.address)}&trp=false&sf=true&output=xml`}
           target="_blank" rel="nofollow">Add to Google calendar</a>
    )
}

function includeForm(currentEvent) {
    if (currentEvent.requiresRegistration) {
        return (
            <div className="col-md-6">
                {createForm(currentEvent)}
            </div>
        )
    }
    else {
        return (
            <></>
        )
    }
}

/**
 * Displays the extended content about an event.
 * @returns {*}
 * @constructor
 */
function ReadMore({currentEvent, dateList}) {
    const { t } = useTranslation();
    if (currentEvent.venue) {
        return (
            <>
                <h2 id="eventDisplayName">{currentEvent.name}</h2>
                <div className="row">
                    <div className={currentEvent.requiresRegistration ? 'col-md-6' : 'col-md-12'}>
                        <EventType eventTypeInt={currentEvent.eventTypeId}/>
                        <p dangerouslySetInnerHTML={{__html: currentEvent.description}}/>
                        <Venue venue={currentEvent.venue} venueName={currentEvent.venue.name}
                               venueAddress={currentEvent.venue.address} venuePostalCode={currentEvent.venue.postalCode}
                               venueLocality={currentEvent.venue.locality}/>
                        <h4>
                            {t('upcoming-dates')}
                        </h4>
                        <div className="card card-body bg-light">
                            {Array.isArray(dateList) ? dateList.map(date => {
                                return (
                                    <div className="row" key={date.eventDateId}>
                                        <div className="col-md-3">
                                            &#x1f4c5; {moment(date.startIso, "YYYY-MM-DD'T'hh:mm:ss").format("Do MMM YYYY h:mm a")}
                                        </div>
                                        <div className="col-md-3">
                                            ({moment(date.startIso, "YYYY-MM-DD'T'hh:mm:ss").fromNow()})
                                        </div>
                                        <div className="col-md-3">
                                            {renderAddToGoogleCalendar(currentEvent, date)}
                                        </div>
                                    </div>
                                )
                            }) : ''}
                        </div>
                    </div>
                    {includeForm(currentEvent)}
                </div>

            </>
        );
    } else {
        return <></>
    }
}

const ReadMoreModal = makeModal(ReadMore);

export default ReadMoreModal;