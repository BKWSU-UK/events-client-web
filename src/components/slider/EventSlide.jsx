import { SplideSlide } from "@splidejs/react-splide";
import React, { useContext, useMemo } from "react";
import { imageAdapter } from "../../utils/imgUtils";
import EventTypeTitle from "../compositeCalendar/card/EventTypeTitle";
import EventCardTitle from "../compositeCalendar/card/EventCardTitle";
import EventExtraInfo from "../compositeCalendar/card/EventExtraInfo";
import { RenderDate } from "../readMore/ReadMore";
import CompositeCalendarContext, {
  DATE_ACTIONS,
} from "../../context/CompositeCalendarContext";
import { handleShowEventDate } from "../commonActions";
import EventContext from "../../context/EventContext";

/**
 * Used to display an event in a single slide.
 * @constructor
 */
const EventSlide = ({ event, i, eventsConfig }) => {
  const { dispatchDate } = useContext(CompositeCalendarContext);
  const eventContext = useContext(EventContext);

  const showEventDate = (e) => {
    e.preventDefault();
    handleShowEventDate(eventContext, event, dispatchDate);
  };

  const heroImage = useMemo(
    () => imageAdapter(event, eventsConfig),
    [event.id],
  );

  return (
    <SplideSlide key={i} className="simple-event-slide">
      <div
        style={{
          background: `url("${heroImage}") center center / cover no-repeat`,
        }}
        className="calendar-event-image"
        onClick={showEventDate}
      />
      <div className="simple-event-slide-content">
        <EventTypeTitle ev={event} />
        <EventCardTitle ev={event} showEventDate={showEventDate} />
        <EventExtraInfo currentEvent={event} />
        <RenderDate
          date={event}
          currentEvent={event}
          timeFormat={"HH:mm"}
          useIcon={true}
        />
      </div>
    </SplideSlide>
  );
};

export default EventSlide;
