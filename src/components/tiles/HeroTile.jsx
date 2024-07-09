import React, {useMemo} from "react";
import {imageAdapter} from "../../utils/imgUtils";
import EventTypeTitle from "../compositeCalendar/card/EventTypeTitle";
import EventCardTitle from "../compositeCalendar/card/EventCardTitle";
import EventExtraInfo from "../compositeCalendar/card/EventExtraInfo";
import {RenderDate} from "../readMore/ReadMore";
import useTimeFormat from "../../hooks/useTimeFormat";
import EventLocation from "../compositeCalendar/card/EventLocation";
import {useTranslation} from "../../i18n";

const EXTRA_INFO_LIMIT = 250;

/**
 * Contains the main tile on top (mobile) or on the side.
 * @constructor
 */
const HeroTile = ({ data, showEventDate }) => {
  const { t } = useTranslation();
  const ev = data[0];
  const heroImage = useMemo(
    () => imageAdapter(ev, window.eventsConfig[0]),
    [ev],
  );
  const timeFormat = useTimeFormat();

  const myShowEventDate = (e) => {
    showEventDate(e, ev);
  };

  return (
    <div>
      <img
        className="tiles-lead"
        src={heroImage}
        alt={ev.name}
        onClick={myShowEventDate}
      />
      <div className="tiles-events-body">
        <EventTypeTitle ev={ev} />
        <EventCardTitle ev={ev} showEventDate={myShowEventDate} />
        <EventExtraInfo
          currentEvent={ev}
          limit={EXTRA_INFO_LIMIT}
          linkify={true}
        />
        <div className="calendar-event-datetime">
          <EventLocation ev={ev} />
          <RenderDate
            date={ev}
            currentEvent={ev}
            timeFormat={timeFormat}
            useIcon={true}
          />
        </div>
        <div className="tiles-more-details">
          <a href="#" onClick={myShowEventDate}>
            {t("More details")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroTile;
