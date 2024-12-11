import React, { createContext, useReducer } from "react";

/**
 * The context used to keep track of the expansion of the customer and product tables.
 */
export const EventCountdownContext = createContext();

export const EVENT_COUNTDOWN_ACTIONS = {
  SET_DATA: "SET_DATA",
  START_EVENT: "START_EVENT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case EVENT_COUNTDOWN_ACTIONS.SET_DATA:
      return { ...state, data: action.data };
    case EVENT_COUNTDOWN_ACTIONS.START_EVENT:
      return { ...state, started: true };
    default:
      return { ...state, started: true };
  }
};

export const EventCountdownContextProvider = (props) => {
  const [stateCountdownData, dispatchCountdown] = useReducer(reducer, {
    data: null,
    started: false,
  });
  return (
    <EventCountdownContext.Provider
      value={{
        stateCountdownData,
        dispatchCountdown,
      }}
    >
      {props.children}
    </EventCountdownContext.Provider>
  );
};
