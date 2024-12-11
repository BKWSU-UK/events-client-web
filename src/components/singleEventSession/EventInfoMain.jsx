import React from "react";
import { DescriptionDisplay } from "../compositeCalendar/EventDateModal";
import EventInfoDate from "./eventInfoSection/EventInfoDate";
import EventInfoTime from "./eventInfoSection/EventInfoTime";
import EventInfoType from "./eventInfoSection/EVentInfoType";
import EventInfoSocialMedia from "./eventInfoSection/EventInfoSocialMedia";
import GoogleCalendarImportButton from "./GoogleCalendrImportButton";
import EventOrganisation from "./EventOrganisation";

/**
 * Event Information main block.
 * @param ev
 * @constructor
 */
const EventInfoMain = ({ ev }) => {
  return (
    <div className="row">
      <div className="col-12 col-sm-6 calendar-detail-title">
        <h4 className="mt-3">{ev.name}</h4>
        <EventOrganisation ev={ev} />
        <DescriptionDisplay
          event={ev}
          className="calendar-detail-description"
        />
      </div>
      <div className="col-12 col-sm-6">
        <div className="card ml-3 mr-3 mt-3 mb-3">
          <ul className="list-group list-group-flush">
            <EventInfoDate ev={ev} />
            <EventInfoTime ev={ev} />
            <EventInfoType ev={ev} />
            <EventInfoSocialMedia ev={ev} />
          </ul>
        </div>
        <div className="row">
          <GoogleCalendarImportButton ev={ev} />
        </div>
      </div>
    </div>
  );
};

export default EventInfoMain;
