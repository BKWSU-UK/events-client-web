import React from "react";
import { isSameDay } from "../../../utils/dateUtils";
import moment from "moment-timezone";
import useEventDateHook from "../useEventDateHook";
import EventInfoContainer from "./EventInfoContainer";

/**
 * Used to print out the event date information.
 * @constructor
 */
const EventInfoDate = ({ ev }) => {
  const { langCode, eventsConfig, adaptedEventDate } = useEventDateHook(ev);
  const calendaDayImage =
    eventsConfig.calendarDayImage || "/assets/images/calendar_day.png";

  const renderDate = (isoDate) => {
    return moment(isoDate, "YYYY-MM-DD'T'hh:mm:ss")
      .locale(langCode)
      .format(`Do MMMM YYYY`);
  };

  const startDate = renderDate(adaptedEventDate.startIso);

  const renderEndDate = () => {
    const sameDay = isSameDay(adaptedEventDate);
    if (sameDay) {
      return "";
    }
    return ` - ${renderDate(adaptedEventDate.endIso)}`;
  };

  return (
    <EventInfoContainer>
      <div className="calendar-flex-icon">
        <img src={calendaDayImage} alt="15 April 2022" />
      </div>
      <div>
        {startDate}
        {renderEndDate()}
      </div>
    </EventInfoContainer>
  );
};

export default EventInfoDate;
