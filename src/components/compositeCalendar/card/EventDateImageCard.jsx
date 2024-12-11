import { RenderDate } from "../../readMore/ReadMore";
import EventExtraInfo from "./EventExtraInfo";
import React, { useContext, useMemo } from "react";
import { useTranslation } from "../../../i18n";
import { imageAdapter } from "../../../utils/imgUtils";
import OnlineNotice from "./OnlineNotice";
import EventCardTitle from "./EventCardTitle";
import EventTypeTitle from "./EventTypeTitle";
import { chooseOnlineClass } from "./EventDateCard";
import EventContext from "../../../context/EventContext";

/**
 * Used to display an event date.
 * @param ev The event
 * @param timeFormat The time format
 * @param showEventDate Used to display the event date.
 * @param startAfterNow
 * @returns {JSX.Element}
 * @constructor
 */
const EventDateImageCard = ({
  ev,
  timeFormat,
  showEventDate,
  startAfterNow,
}) => {
  const { t } = useTranslation();

  const { eventsConfig } = useContext(EventContext);

  const heroImage = useMemo(
    () => imageAdapter(ev, eventsConfig, true),
    [ev.id],
  );

  return (
    <div className="col-12 col-sm-6 col-xl-3 calendar-event-card-wrapper">
      <div className={`card ${!startAfterNow && "calendar-date-past"}`}>
        <div
          style={{
            background: `url("${heroImage}") center center / cover no-repeat`,
          }}
          className="calendar-event-image"
          onClick={showEventDate}
        />
        <div className={`${chooseOnlineClass(ev)} card-body`}>
          <OnlineNotice ev={ev} />
          <EventTypeTitle ev={ev} />
          <EventCardTitle ev={ev} showEventDate={showEventDate} />
          <EventExtraInfo currentEvent={ev} />
          <div className="calendar-event-datetime">
            <RenderDate
              date={ev}
              currentEvent={ev}
              timeFormat={timeFormat}
              useIcon={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDateImageCard;
