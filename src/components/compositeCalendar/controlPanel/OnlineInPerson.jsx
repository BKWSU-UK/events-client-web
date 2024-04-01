import React from "react";
import { ONLINE_STATUS } from "../../../context/CompositeCalendarContext";
import useOnlineStatus from "../../../hooks/useOnlineStatus";
import { faHouse, faTv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const OnlineStatusButtonsRender = ({
  stateCalendar,
  activateOnline,
  activateInPerson,
  t,
  isMobile = false,
}) => {
  return (
    <>
      <button
        type="button"
        data-toggle="button"
        className={`btn btn-info ${
          stateCalendar.onlineStatus === ONLINE_STATUS.ONLINE && "active"
        } `}
        onClick={activateOnline}
      >
        {isMobile ? <FontAwesomeIcon icon={faTv} /> : t("online_state_Online")}
      </button>
      <button
        type="button"
        data-toggle="button"
        className={`btn btn-info ${
          stateCalendar.onlineStatus === ONLINE_STATUS.IN_PERSON && "active"
        }`}
        onClick={activateInPerson}
      >
        {isMobile ? (
          <FontAwesomeIcon icon={faHouse} />
        ) : (
          t("online_state_In Person")
        )}
      </button>
    </>
  );
};

/**
 * Online and in person buttons. This is a filter.
 * @constructor
 */
const OnlineStatusButtons = () => {
  const [stateCalendar, activateOnline, activateInPerson, t] =
    useOnlineStatus();

  return (
    <>
      <OnlineStatusButtonsRender
        t={t}
        activateInPerson={activateInPerson}
        activateOnline={activateOnline}
        stateCalendar={stateCalendar}
      />
    </>
  );
};

export default OnlineStatusButtons;
