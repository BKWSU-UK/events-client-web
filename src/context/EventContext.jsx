import React, { createContext, useReducer, useState } from "react";
import { extractParameter } from "../utils/paramExtraction";
import { ONLINE_STATUSES } from "./onlineStates";
import { EVENT_CONFIG } from "./appParams";

export const EVENTS_LANG = "eventsLang";

export const ALL_ORG_IDS = -1;

const INITIAL_PAGE_SIZE = 14;

/**
 * Extracts the filters for the event list
 * @param props Used also for parameter extraction
 * @returns {{featured: *, eventTypeIds: *, orgId: *, lang: "Two-character language code"}}
 */
export const extractEventListParameters = (props) => {
  const orgId = extractParameter(props, "orgId", 2);
  const eventTypeIds = extractParameter(
    props,
    EVENT_CONFIG.EVENT_TYPE_IDS,
    "1,2,3,4,5,6,7,8,9,10,11,12,13,15",
  );
  const featured = extractParameter(props, "featured", null);
  const eventsLang = extractParameter(props, EVENTS_LANG, null);
  const initialPageSize = extractParameter(
    props,
    EVENT_CONFIG.INITIAL_PAGE_SIZE,
    INITIAL_PAGE_SIZE,
  );

  const searchFilterFunction = props.eventsConfig["searchFilterFunction"];
  const eventSliceFunction = props.eventsConfig["eventSliceFunction"];
  return {
    orgId,
    eventTypeIds,
    featured,
    eventsLang,
    searchFilterFunction,
    eventSliceFunction,
    initialPageSize,
  };
};

/**
 * The context used to keep track of the expansion of the customer and product tables.
 */
const EventContext = createContext();

export const ACTIONS = {
  CHANGE_ONLINE_STATE: "CHANGE_ONLINE_STATE",
  SELECT_TAG: "SELECT_TAG",
  SET_TAGS: "SET_TAGS",
  SET_NO_TAGS: "SET_NO_TAGS",
  TOGGLE_TAGS: "TOGGLE_TAGS",
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CHANGE_ONLINE_STATE:
      return {
        ...state,
        onlineStatus: action.payload.onlineStatus,
      };
    case ACTIONS.SELECT_TAG:
      return {
        ...state,
        selectedTag: action.payload.selectedTag,
      };
    case ACTIONS.SET_TAGS:
      return {
        ...state,
        tags: action.payload.tags,
      };
    case ACTIONS.SET_NO_TAGS:
      return {
        ...state,
        noTags: action.payload.noTags,
      };
    case ACTIONS.TOGGLE_TAGS:
      const tagState = !state.activateTags;
      return {
        ...state,
        selectedTag: tagState ? state.selectedTag : null,
        activateTags: tagState,
      };
    default:
      return state;
  }
};

export const EventContextProvider = ({ children, eventsConfig }) => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [similarEvents, setSimilarEvents] = useState([]);
  const [orgIdFilter, setOrgIdFilter] = useState(ALL_ORG_IDS);
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    onlineStatus: ONLINE_STATUSES.NONE,
    selectedTag: null,
    tags: [],
    noTags: [],
    activateTags: true,
  });

  return (
    <EventContext.Provider
      value={{
        events,
        setEvents,
        currentEvent,
        setCurrentEvent,
        similarEvents,
        setSimilarEvents,
        orgIdFilter,
        setOrgIdFilter,
        eventsConfig,
        filterState,
        filterDispatch,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
