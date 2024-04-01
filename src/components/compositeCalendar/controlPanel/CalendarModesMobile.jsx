import React, { useState } from "react";
import useCalendarModes from "../../../hooks/useCalendarModes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { CalendarModesButton } from "./CalendarModes";
import useOnlineStatus from "../../../hooks/useOnlineStatus";
import { OnlineStatusButtonsRender } from "./OnlineInPerson";
import DateAndFilter from "./DateAndFilter";

/**
 * Used to switch between the calendar modes.
 * @returns {JSX.Element}
 * @constructor
 */
export const CalendarModesMobile = () => {
  const [show, setShow] = useState(false);
  const [calendarModes, activeOnType, t] = useCalendarModes();
  const [stateCalendar, activateOnline, activateInPerson] = useOnlineStatus();

  return (
    <>
      <div className="col-12">
        <button
          className={`btn btn-${show ? "success" : "info"} hamburger-button`}
          onClick={() => setShow(!show)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      {show && (
        <div className="col-12 calendar-modes-button-mobile">
          <CalendarModesButton
            activeOnType={activeOnType}
            calendarModes={calendarModes}
            t={t}
            isMobile={true}
          />
          <div className="float-right">
            <OnlineStatusButtonsRender
              t={t}
              activateInPerson={activateInPerson}
              activateOnline={activateOnline}
              stateCalendar={stateCalendar}
              isMobile={true}
            />
          </div>
        </div>
      )}
      {show && (
        <div className="col-12 calendar-dates-other-filters mb-3">
          <DateAndFilter />
        </div>
      )}
    </>
  );
};

export default CalendarModesMobile;
