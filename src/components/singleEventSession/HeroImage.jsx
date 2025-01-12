import React, { useContext } from "react";
import { useMemo } from "react";
import { imageAdapter } from "../../utils/imgUtils";
import EventContext from "../../context/EventContext";

/**
 * Hero Image to be displayed for the event.
 * @constructor
 */
const HeroImage = ({ ev }) => {
  const eventsConfig = useContext(EventContext);
  const heroImage = useMemo(
    () => imageAdapter(ev, eventsConfig),
    [ev, eventsConfig],
  );
  return (
    <div className="row">
      <div className="col-12">
        <img
          className="img-fluid calendar-event-session-hero-image"
          src={heroImage}
          alt={ev.name}
        />
      </div>
    </div>
  );
};

export default HeroImage;
