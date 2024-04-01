import React, { useContext } from "react";
import EventContext from "../../context/EventContext";

/**
 * The event location.
 * @constructor
 */
const EventOrganisation = ({ ev }) => {
  const { eventsConfig } = useContext(EventContext);

  console.log("EventOrganisation ev", ev);

  const shivImage = eventsConfig.shivaStarImage || "/assets/images/shiva.png";

  if (!ev.organisations || ev.organisations.length === 0) {
    return <></>;
  }

  return (
    <div className="calendar-flex-centre calendar-organisation">
      <img src={shivImage} className="calendar-shiva" alt={ev.name} />
      {ev.organisations[0].name}
    </div>
  );
};

export default EventOrganisation;
