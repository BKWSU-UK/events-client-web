import { extractParameter } from "../utils/paramExtraction";
import { ALL_ORG_IDS, DEFAULT_LANGUAGE } from "../context/EventContext";
import { SERVER_BASE } from "../apiConstants";
import { DISPLAY_ONLINE_FILTER } from "../context/appParams";
import { ONLINE_STATUSES } from "../context/onlineStates";
import {
  DATA_ACCESS_PARAMS,
  QUERY_PARAMS,
  TAGS_OPERATOR,
} from "./dataAccessConstants";
import { groupByDate } from "./dateCounterFactory";
import { convertDate } from "../utils/dateUtils";
import searchAdapter from "../context/searchAdapter";

const eventLimit = (eventContext) =>
  extractParameter({ ...eventContext }, "eventsLimit", 10000);

const onlyWebcast = (eventContext) =>
  extractParameter({ ...eventContext }, DATA_ACCESS_PARAMS.ONLY_WEBCAST, false);

const onlineOnly = (eventContext) =>
  extractParameter({ ...eventContext }, DATA_ACCESS_PARAMS.ONLINE_ONLY, false);

const hasRegistration = (eventContext) =>
  extractParameter({ ...eventContext }, "hasRegistration", false);

const getTagsString = (eventContext) => {
  const { selectedTag, activateTags } = eventContext?.filterState;
  if (!activateTags) {
    return null;
  }
  if (!!selectedTag) {
    return [selectedTag];
  }
  return extractParameter({ ...eventContext }, "tags");
};

function getTagsOperator(eventContext) {
  const { eventsConfig } = eventContext;
  return eventsConfig.tagsOperator === TAGS_OPERATOR.AND
    ? TAGS_OPERATOR.AND
    : null;
}

function getNoTagsParameter(eventContext) {
  const { activateTags } = eventContext?.filterState;
  if (!activateTags) {
    return null;
  }
  return extractParameter({ ...eventContext }, QUERY_PARAMS.NO_TAGS);
}

const appendToTargetUrl = (value, targetUrl, parameter) => {
  if (value === DATA_ACCESS_PARAMS.LOGICAL_YES) {
    targetUrl += `&${parameter}=true`;
  } else if (value === DATA_ACCESS_PARAMS.LOGICAL_NO) {
    targetUrl += `&${parameter}=false`;
  }
  return targetUrl;
};

const processHasRegistration = (targetUrl, eventContext) =>
  appendToTargetUrl(
    hasRegistration(eventContext),
    targetUrl,
    "hasRegistration",
  );

const processPrivate = (targetUrl, eventContext) => {
  const extracted = extractParameter({ ...eventContext }, "private", false);
  if (extracted === "all") {
    targetUrl += `&privateAll=true`;
    return targetUrl;
  }
  return appendToTargetUrl(extracted, targetUrl, "private");
};

const processTags = (targetUrl, eventContext) => {
  const tagsString = getTagsString(eventContext);
  let newTargetUrl = targetUrl;
  if (!!tagsString) {
    newTargetUrl += `&tags=${tagsString}`;
    const tagsOperator = getTagsOperator(eventContext);
    if (!!tagsOperator) {
      newTargetUrl += `&tagsAnd=true`;
    }
  }
  const noTags = getNoTagsParameter(eventContext);
  if (!!noTags) {
    newTargetUrl += `&noTags=${noTags}`;
  }
  return newTargetUrl;
};

const onlyWebcastAdapter = (isOnlyWebcast, targetUrl) => {
  if (isOnlyWebcast) {
    targetUrl += `&${DATA_ACCESS_PARAMS.ONLY_WEBCAST}=${isOnlyWebcast}`;
  }
  return targetUrl;
};

const processOnlineOnly = (targetUrl, eventContext) => {
  console.log("processOnlineOnly", processOnlineOnly);
  const onlineOnlyFilter = extractParameter(
    eventContext,
    DISPLAY_ONLINE_FILTER,
  );
  if (!onlineOnlyFilter) {
    return appendToTargetUrl(
      onlineOnly(eventContext),
      targetUrl,
      DATA_ACCESS_PARAMS.ONLINE_ONLY,
    );
  } else {
    switch (eventContext.filterState.onlineStatus) {
      case ONLINE_STATUSES.NONE:
        return targetUrl;
      case ONLINE_STATUSES.IN_PERSON:
        return appendToTargetUrl(
          DATA_ACCESS_PARAMS.LOGICAL_NO,
          targetUrl,
          DATA_ACCESS_PARAMS.ONLINE_ONLY,
        );
      case ONLINE_STATUSES.ONLINE_ONLY:
        return appendToTargetUrl(
          DATA_ACCESS_PARAMS.LOGICAL_YES,
          targetUrl,
          DATA_ACCESS_PARAMS.ONLINE_ONLY,
        );
      case ONLINE_STATUSES.MIXED: {
        const targetUrl1 = appendToTargetUrl(
          DATA_ACCESS_PARAMS.LOGICAL_NO,
          targetUrl,
          DATA_ACCESS_PARAMS.ONLINE_ONLY,
        );
        return onlyWebcastAdapter(true, targetUrl1);
      }
      case ONLINE_STATUSES.HAS_WEBCAST:
        return onlyWebcastAdapter(true, targetUrl);
      default:
        return targetUrl;
    }
  }
};

export const joinIfArray = (ids) => (Array.isArray(ids) ? ids.join(",") : ids);

export const orgIdStrFactory = ({ orgIdFilter, orgId, useAllOrgIds }) => {
  if (parseInt(orgIdFilter) === ALL_ORG_IDS) {
    const extractParameterSimple1 = extractParameter(
      { eventsConfig: { useAllOrgIds } },
      "useAllOrgIds",
      false,
    );
    if (!extractParameterSimple1) {
      return `${ALL_ORG_IDS}`;
    }
    return joinIfArray(orgId);
  }
  return orgIdFilter ? joinIfArray(orgIdFilter) : joinIfArray(orgId);
};

export const appendDates = ({
  targetUrl,
  dateStart,
  dateEnd,
  exactStartDate,
  startDateLimit,
}) => {
  if (!!exactStartDate) {
    targetUrl += `&exactStartDate=${convertDate(exactStartDate)}`;
    return targetUrl;
  }
  if (!!dateStart) {
    targetUrl += `&startDate=${convertDate(dateStart)}`;
  }
  if (!!startDateLimit) {
    targetUrl += `&${QUERY_PARAMS.START_DATE_LIMIT}=${convertDate(startDateLimit)}`;
  }
  if (!!dateEnd) {
    targetUrl += `&endDate=${convertDate(dateEnd)}`;
  }
  return targetUrl;
};

function processSelectedLanguage(targetUrl, eventContext) {
  const languageCode = eventContext?.filterState?.languageCode;
  if (languageCode && languageCode !== DEFAULT_LANGUAGE) {
    targetUrl += `&lang=${languageCode}`;
  }
  return targetUrl;
}

export const targetUrlFactory = (params) => {
  const {
    orgIdStr,
    eventTypeIds,
    startRow = 0,
    eventsLimit,
    eventsLang,
    featured,
    exactStartDate,
    dateStart,
    startDateLimit,
    dateEnd,
    eventContext,
    useMinimal,
    searchExpression,
  } = params;
  let targetUrl = `${SERVER_BASE}/organisationEventReportController.do?orgEventTemplate=jsonEventExport${
    !!useMinimal ? "Minimal" : ""
  }.ftl&orgId=${orgIdStr}`;
  targetUrl += `&eventTypeIds=${eventTypeIds}&fromIndex=${startRow}&toIndex=${eventsLimit}&mimeType=application/json`;
  if (featured) {
    targetUrl += `&featured=true`;
  }
  const isOnlyWebcast = onlyWebcast(eventContext);
  targetUrl = onlyWebcastAdapter(isOnlyWebcast, targetUrl);
  if (eventsLang) {
    targetUrl += `&lang=${eventsLang}`;
  }
  if (!!searchExpression) {
    targetUrl += `&search=${encodeURIComponent(searchExpression)}`;
  }
  const appendFunctions = [
    processOnlineOnly,
    processPrivate,
    processHasRegistration,
    processTags,
  ];
  for (const fn of appendFunctions) {
    targetUrl = fn(targetUrl, eventContext);
  }
  targetUrl = appendDates({
    targetUrl,
    dateStart,
    dateEnd,
    exactStartDate,
    startDateLimit,
  });
  targetUrl = processSelectedLanguage(targetUrl, eventContext);
  return targetUrl;
};

export const getCombinedEventListWithGroupCount = async (
  params1,
  params2,
  searchExpression,
) => {
  const [eventList1, eventList2] = await Promise.all([
    getEventList(params1),
    getEventList(params2),
  ]);
  let eventList = Object.values(
    eventList1.concat(eventList2).reduce((a, e) => {
      a[e.eventDateId] = e;
      return a;
    }, {}),
  );
  eventList = searchAdapter(eventList, searchExpression);
  console.log("getCombinedEventListWithGroupCount");
  const groupedCount = groupByDate(eventList);
  return { groupedCount, eventList };
};

export const getEventListWithGroupCount = async (params) => {
  console.log("grouped count", params.marker);
  let eventList = await getEventList(params);
  const groupedCount = groupByDate(eventList);
  return { groupedCount, eventList };
};

export const getEventListResponse = async (params) => {
  const { orgId, orgIdFilter, eventContext } = params;
  const orgIdStr = orgIdStrFactory({
    orgIdFilter,
    orgId,
    useAllOrgIds: eventContext.useAllOrgIds,
  });
  if (parseInt(orgIdStr) < 1) {
    return [];
  }
  const eventsLimit = params.eventsLimit || eventLimit(eventContext);
  const targetUrl = targetUrlFactory({
    ...params,
    orgIdStr,
    eventsLimit,
    featured: params.featured,
  });

  const fetchResponse = await fetch(targetUrl);
  const json = await fetchResponse.json();
  if (json?.response?.status !== 0) {
    console.error("Error occurred whiles fetching events", json);
  }
  return json.response;
};

export const getEventList = async (params) => {
  const response = await getEventListResponse(params);
  let eventList = response?.data;
  eventList = searchAdapter(
    eventList,
    params.searchExpression,
    params.searchFilterFunction,
    params.eventSliceFunction,
  );
  return eventList;
};

export const fetchSingleEvent = async (eventId) => {
  if (!eventId) {
    return;
  }
  const targetUrl = `${SERVER_BASE}/organisationEventReportController.do?simpleEventTemplate=jsonEvent.ftl&mimeType=application/json&eventIds=${eventId}`;
  const response = await fetch(targetUrl);
  const json = await response.json();
  const jsonResponse = json.response;
  console.log(targetUrl, jsonResponse);
  return jsonResponse;
};

export const fetchEvent = async (setEvent, eventId) => {
  const response = await fetchSingleEvent(eventId);
  setEvent(response.data[0]);
};

export const fetchEventDateList = async (setDateList, eventId) => {
  const response = await fetchSingleEvent(eventId);
  setDateList(response.data[0].dateList);
};

export const fetchSimilarEventList = async (
  eventDateId,
  setSimilarEvents,
  limit = 3,
) => {
  if (!eventDateId) {
    return;
  }
  const targetUrl = `${SERVER_BASE}/similarEvents.do?eventDateId=${eventDateId}&limit=${limit}`;
  console.log("fetchSimilarEventList target", targetUrl);
  const response = await fetch(targetUrl);
  const json = await response.json();
  console.log("similar events", json);
  setSimilarEvents(json);
};

export const fetchOrganisations = async (orgIds) => {
  const orgList = orgIds.join(",");
  const targetUrl = `${SERVER_BASE}/organisations/ids?ids=${orgList}`;
  const response = await fetch(targetUrl);
  return response.json();
};

export const fetchSeatInformation = async (eventDateId) => {
  const targetUrl = `${SERVER_BASE}/seatsAvailable.do?eventDateId=${eventDateId}`;
  const response = await fetch(targetUrl);
  return await response.json();
};

export const fetchEventDate = async (eventDateId) => {
  if (!eventDateId) {
    return null;
  }
  const targetUrl = `${SERVER_BASE}/eventDateEventExact/${eventDateId}`;
  console.log("fetchEventDate", targetUrl);
  const response = await fetch(targetUrl);
  return await response.json();
};

export const fetchEventDateWithSeats = async (eventDateId) => {
  const eventDate = await fetchEventDate(eventDateId);
  if (!!eventDate?.requiresRegistration) {
    const seatInfo = await fetchSeatInformation(eventDateId);
    return { ...eventDate, ...seatInfo };
  }
  return eventDate;
};

export const fetchNextListEvents = async (countries, timezone) => {
  if (!countries) {
    return [];
  }
  const targetUrl = `${SERVER_BASE}/findNextLiveEvent?countries=${countries}&timezone=${timezone}`;
  const response = await fetch(targetUrl);
  return await response.json();
};

export async function fetchEventFormResponse(eventId){
  if(!eventId) {
    return {}
  }
  const targetUrl = `${SERVER_BASE}/events/formredirect-event?eventId=${eventId}`;
  const response = await fetch(targetUrl);
  return await response.json();
}

export async function fetchLanguages(orgId) {
  if(!orgId) {
    return [];
  }
  const targetUrl = `${SERVER_BASE}/events/used-languages/${orgId}`;
  const response = await fetch(targetUrl);
  return await response.json();
}
