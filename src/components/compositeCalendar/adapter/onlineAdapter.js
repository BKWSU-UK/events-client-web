import { DISPLAY_ONLINE_FILTER } from "../../../context/appParams";
import { ONLINE_STATUS } from "../../../context/CompositeCalendarContext";
import { ONLINE_STATUSES } from "../../../context/onlineStates";

export const updateOnlineStatus = (stateCalendar, eventContext) => {
  eventContext.eventsConfig[DISPLAY_ONLINE_FILTER] = true;
  eventContext.filterState = {};
  if (stateCalendar.onlineStatus === ONLINE_STATUS.ONLINE) {
    eventContext.filterState.onlineStatus = ONLINE_STATUSES.HAS_WEBCAST;
  } else if (stateCalendar.onlineStatus === ONLINE_STATUS.IN_PERSON) {
    eventContext.filterState.onlineStatus = ONLINE_STATUSES.IN_PERSON;
  } else {
    eventContext.filterState.onlineStatus = ONLINE_STATUSES.NONE;
  }
};
