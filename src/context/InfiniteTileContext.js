import React, {createContext, useReducer} from "react";
import CompositeCalendarContext, {DATE_ACTIONS} from "./CompositeCalendarContext";

export const InfiniteTileContext = createContext()

export const INFINITE_ACTIONS = {
  DISPLAY_NOTHING_MORE: 'DISPLAY_NOTHING_MORE',
}

const infiniteTileReducer = (state, action) => {
  switch (action.type) {
    case INFINITE_ACTIONS.DISPLAY_NOTHING_MORE:
      return {...state, displayNothingMore: true}
    default:
      return {...state}
  }
}

export const InfiniteTileContextProvider = (props) => {
  const [tileData, dispatchTileData] = useReducer(
    infiniteTileReducer, {
      displayNothingMore: false,
    }
  )
  return (
    <InfiniteTileContext.Provider value={{
      tileData, dispatchTileData,
    }}>{props.children}</InfiniteTileContext.Provider>
  )
}