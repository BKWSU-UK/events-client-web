import React, { useCallback } from "react";
import useEventDateHook from "../useEventDateHook";
import { isSameDay, renderTimeFromIso } from "../../../utils/dateUtils";
import useTimeFormat from "../../../hooks/useTimeFormat";
import EventInfoContainer from "./EventInfoContainer";
import { useTranslation } from "../../../i18n";

/**
 * Displays th time
 * @constructor
 */
const EventInfoTime = ({ ev }) => {
  const { t } = useTranslation();
  const timeFormat = useTimeFormat();
  const { langCode, eventsConfig, adaptedEventDate } = useEventDateHook(ev);
  const calendaTimeImage =
    eventsConfig.calendarTimeImage || "/assets/images/calendar_time.png";
  const startTimeExpr = renderTimeFromIso(
    adaptedEventDate.startIso,
    langCode,
    timeFormat,
  );

  const renderEndTime = useCallback(() => {
    return ` - ${renderTimeFromIso(
      adaptedEventDate.endIso,
      langCode,
      timeFormat,
    )}`;
  }, [adaptedEventDate.endIso, langCode, timeFormat]);
  return (
    <EventInfoContainer>
      <div className="calendar-flex-icon">
        <img src={calendaTimeImage} alt={t("Time")} />
      </div>
      <div>
        {startTimeExpr}
        {renderEndTime()} {ev.timeZoneInfo ? `(${ev.timeZoneInfo})` : ""}
      </div>
    </EventInfoContainer>
  );
};

export default EventInfoTime;
