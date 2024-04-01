import React, { useContext } from "react";
import CompositeCalendarContext from "../../context/CompositeCalendarContext";
import { formatHeaderDates } from "../../utils/dateUtils";
import COMPOSITE_CALENDAR_CONFIG from "./compositeCalendarConfig";

/**
 * Displays a date period.
 * @constructor
 */
const DatePeriod = () => {
  const compositeCalendarContext = useContext(CompositeCalendarContext);
  const { stateCalendar } = compositeCalendarContext;

  return (
    <div className="row" style={{ clear: "both" }}>
      <div className="col-12">
        <h3 className="mt-5">
          {formatHeaderDates(
            stateCalendar.visibleDateStart,
            COMPOSITE_CALENDAR_CONFIG.HEADER_DATE_FORMAT,
          )}{" "}
          &#8212;{" "}
          {formatHeaderDates(
            stateCalendar.visibleDateEnd,
            COMPOSITE_CALENDAR_CONFIG.HEADER_DATE_FORMAT,
          )}
        </h3>
      </div>
    </div>
  );
};

export default DatePeriod;
