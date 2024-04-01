import React from "react";

/**
 * Displays the event location.
 * @constructor
 */
const EventLocation = ({ ev }) => {
  return <div className="event-location">{ev.locality}</div>;
};

export default EventLocation;
