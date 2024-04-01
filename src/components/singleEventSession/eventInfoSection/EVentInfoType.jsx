import React, { useContext } from "react";
import EventContext from "../../../context/EventContext";
import { useTranslation } from "../../../i18n";
import { eventMap } from "../../../service/dataAccessConstants";
import EventInfoContainer from "./EventInfoContainer";

/**
 * Used to display th event type.
 * @param ev
 * @constructor
 */
const EventInfoType = ({ ev }) => {
  const { t } = useTranslation();
  const { eventsConfig } = useContext(EventContext);
  const calendarTimeImage =
    eventsConfig.calendarEventTypeImage ||
    "/assets/images/calendar_event_type.png";
  const eventTypeId = ev.eventType;
  const eventTypeStr = t(eventMap["" + eventTypeId]);

  const renderOnlineStatus = () => {
    const inperson = !ev.onlineOnly;
    const online = ev.hasWebcast;
    if (inperson && online) {
      return t("online_state_Mixed");
    }
    if (inperson) {
      return t("online_state_In Person");
    }
    if (online) {
      return t("online_state_Online");
    }
  };

  return (
    <EventInfoContainer>
      <div className="calendar-flex-icon">
        <img src={calendarTimeImage} alt={eventTypeStr} />
      </div>
      <div>
        {eventTypeStr} - {renderOnlineStatus()}
      </div>
    </EventInfoContainer>
  );
};

export default EventInfoType;
