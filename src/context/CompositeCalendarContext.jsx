import React, { createContext, useReducer } from "react";
import { dateDiff, monthStartAndEnd } from "../utils/dateUtils";

const CompositeCalendarContext = createContext();

export const DATE_ACTIONS = {
  SET_DATE: "SET_DATE",
  INIT_DATE: "INIT_DATE",
  SET_PERIOD: "SET_PERIOD",
  SET_RANGE: "SET_RANGE",
  SELECT_SINGLE_DATE: "SELECT_SINGLE_DATE",
  SELECT_MONTH: "SELECT_MONTH",
  SELECT_WEEK: "SELECT_WEEK",
  SELECT_DAY: "SELECT_DAY",
  SET_DATE_COUNTS: "SET_DATE_COUNTS",
  SET_EVENT_COUNT: "SET_EVENT_COUNT",
  SHOW_MODAL_EVENT_DATE: "SHOW_MODAL_EVENT_DATE",
  HIDE_MODAL_EVENT_DATE: "HIDE_MODAL_EVENT_DATE",
  CHANGE_CARD_TYPE: "CHANGE_CARD_TYPE",
  CHANGE_ONLINE_STATUS: "CHANGE_ONLINE_STATUS",
  CHANGE_CATEGORY_FILTER: "CHANGE_CATEGORY_FILTER",
  SET_SEARCH_EXPRESSION: "SET_SEARCH_EXPRESSION",
};

export const CARD_TYPEUI_VIEW = {
  LONG_CARD: 0,
  IMAGE_CARD: 1,
  MONTH: 2,
  WEEK: 3,
  DAY: 4,
  INFINITE_TILES: 5,
};

export const ACTION_CARD_MAP = {
  [DATE_ACTIONS.SELECT_MONTH]: CARD_TYPEUI_VIEW.MONTH,
  [DATE_ACTIONS.SELECT_WEEK]: CARD_TYPEUI_VIEW.WEEK,
  [DATE_ACTIONS.SELECT_DAY]: CARD_TYPEUI_VIEW.DAY,
};

export const ONLINE_STATUS = {
  ALL: 0,
  ONLINE: 1,
  IN_PERSON: 2,
};

export const ALL_CATEGORIES = 0;

const calculateVisibleEndDate = (dateRange, visibleDateStart) =>
  !!visibleDateStart ? dateDiff(visibleDateStart, dateRange - 1) : null;

const dateReducer = (state, action) => {
  switch (action.type) {
    case DATE_ACTIONS.SET_DATE:
      return {
        ...state,
        currentDate: action.payload,
      };
    case DATE_ACTIONS.INIT_DATE: {
      const dateRange = state.dateRange;
      const now = new Date();
      const startDate = dateDiff(now, state.startBefore);
      const endDate = dateDiff(now, state.endAfter);
      return {
        ...state,
        currentDate: now,
        startDate: startDate,
        endDate: endDate,
        visibleDateStart: startDate,
        visibleDateEnd: calculateVisibleEndDate(dateRange, startDate),
        selectedSingleDate: now,
      };
    }
    case DATE_ACTIONS.SET_PERIOD: {
      const dateRange = state.dateRange;
      return {
        ...state,
        visibleDateStart: action.payload.visibleDateStart,
        visibleDateEnd: calculateVisibleEndDate(
          dateRange,
          action.payload.visibleDateStart,
        ),
      };
    }
    case DATE_ACTIONS.SET_RANGE: {
      const dateRange = action.payload.dateRange;
      return {
        ...state,
        dateRange,
        visibleDateEnd: calculateVisibleEndDate(
          dateRange,
          state.visibleDateStart,
        ),
      };
    }
    case DATE_ACTIONS.SELECT_SINGLE_DATE: {
      if (
        state.selectedSingleDate?.getTime() ===
        action.payload.selectedSingleDate.getTime()
      ) {
        return {
          ...state,
          selectedSingleDate: null,
        };
      }
      if (state.cardType === CARD_TYPEUI_VIEW.MONTH) {
        const { monthStart, monthEnd } = monthStartAndEnd(
          action.payload.selectedSingleDate,
        );
        return {
          ...state,
          selectedSingleDate: action.payload.selectedSingleDate,
          visibleDateStart: monthStart,
          visibleDateEnd: monthEnd,
        };
      }
      return {
        ...state,
        selectedSingleDate: action.payload.selectedSingleDate,
      };
    }
    case DATE_ACTIONS.SELECT_MONTH:
    case DATE_ACTIONS.SELECT_WEEK:
    case DATE_ACTIONS.SELECT_DAY:
      return {
        ...state,
        selectedSingleDate: action.payload.selectedSingleDate,
        visibleDateStart: action.payload.selectedSingleDate,
        visibleDateEnd: action.payload.visibleDateEnd,
        cardType: ACTION_CARD_MAP[action.type],
      };
    case DATE_ACTIONS.SET_DATE_COUNTS: {
      if (!action.payload.groupedCount) {
        return state;
      }
      return {
        ...state,
        groupedCount: { ...action.payload.groupedCount },
      };
    }
    case DATE_ACTIONS.SET_EVENT_COUNT: {
      return {
        ...state,
        eventCount: action.payload.eventCount,
      };
    }
    case DATE_ACTIONS.SHOW_MODAL_EVENT_DATE: {
      return {
        ...state,
        modalEventDateId: action.payload.modalEventDateId,
      };
    }
    case DATE_ACTIONS.HIDE_MODAL_EVENT_DATE: {
      return {
        ...state,
        modalEventDateId: null,
      };
    }
    case DATE_ACTIONS.CHANGE_CARD_TYPE: {
      return {
        ...state,
        cardType: action.payload.cardType,
      };
    }
    case DATE_ACTIONS.CHANGE_ONLINE_STATUS: {
      return {
        ...state,
        onlineStatus: action.payload.onlineStatus,
      };
    }
    case DATE_ACTIONS.CHANGE_CATEGORY_FILTER:
      return {
        ...state,
        categoryFilter: action.payload.categoryFilter,
      };
    case DATE_ACTIONS.SET_SEARCH_EXPRESSION:
      return {
        ...state,
        searchExpression: action.payload.searchExpression,
      };
    default:
      return state;
  }
};

export const CompositeCalendarContextProvider = (props) => {
  const [stateCalendar, dispatchDate] = useReducer(dateReducer, {
    currentDate: new Date(),
    startDate: null,
    endDate: null,
    startBefore: -2,
    endAfter: 60,
    visibleDateStart: null,
    visibleDateEnd: null,
    dateRange: -1,
    selectedSingleDate: null,
    groupedCount: null,
    modalEventDateId: null,
    cardType: CARD_TYPEUI_VIEW.IMAGE_CARD,
    onlineStatus: ONLINE_STATUS.ALL,
    categoryFilter: ALL_CATEGORIES,
    searchExpression: "",
    eventCount: 0,
  });
  return (
    <CompositeCalendarContext.Provider
      value={{
        stateCalendar,
        dispatchDate,
      }}
    >
      {props.children}
    </CompositeCalendarContext.Provider>
  );
};

export default CompositeCalendarContext;
