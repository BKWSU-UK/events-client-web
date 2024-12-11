import { dateToKey } from "../../../utils/dateUtils";
import { eventTypeIdAdapter } from "./eventTypeIdAdapter";
import { updateOnlineStatus } from "./onlineAdapter";
import { getEventListWithGroupCount } from "../../../service/dataAccess";
import { orgIdFilterAdapter } from "./orgIdAdapter";
import { QUERY_PARAMS } from "../../../service/dataAccessConstants";
import { EVENTS_LIMIT } from "../../../context/appParams";
import { DATE_ACTIONS } from "../../../context/CompositeCalendarContext";

export const onlineStatusAdapter = (stateCalendar) =>
  `onlineStatus:${stateCalendar.onlineStatus}`;

/**
 * Used to retrieve a single day of data.
 */
export class MultiDateQueryAdapter {
  createQueryKey = (stateCalendar) => {
    const startDate = stateCalendar.visibleDateStart;
    const endDate = stateCalendar.visibleDateEnd;
    return `${dateToKey(startDate)}_${dateToKey(endDate)}-${onlineStatusAdapter(
      stateCalendar,
    )}-category_${stateCalendar.categoryFilter}`;
  };

  callEventList = (stateCalendar, eventContext) => {
    const startDate = stateCalendar.visibleDateStart;
    const endDate = stateCalendar.visibleDateEnd;
    if (!!startDate && !!endDate) {
      const eventsConfig = eventContext.eventsConfig;
      const orgId = eventsConfig.orgId;
      const eventTypeIds = eventTypeIdAdapter(
        stateCalendar,
        eventsConfig.eventTypeIds,
      );
      const eventsLang = eventsConfig.eventsLang;

      updateOnlineStatus(stateCalendar, eventContext);

      return getEventListWithGroupCount({
        orgId,
        eventTypeIds,
        eventsLang,
        orgIdFilter: orgIdFilterAdapter(eventContext),
        eventContext,
        dateStart: startDate,
        [QUERY_PARAMS.START_DATE_LIMIT]: endDate,
        useMinimal: true,
        eventsLimit: EVENTS_LIMIT,
        searchExpression: stateCalendar.searchExpression,
      });
    }
    return { groupedCount: {}, eventList: [] };
  };

  updateGroupCount = (dispatchDate, data) => {
    dispatchDate({
      type: DATE_ACTIONS.SET_DATE_COUNTS,
      payload: { groupedCount: data?.groupedCount },
    });
  };

  limitResults = (eventList) => eventList;
}
