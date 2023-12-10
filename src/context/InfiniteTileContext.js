import React, {createContext, useReducer} from "react";
import CompositeCalendarContext, {DATE_ACTIONS} from "./CompositeCalendarContext";

export const InfiniteTileContext = createContext()

const infiniteTileReducer = (state, action) => {
  switch (action.type) {
    case DATE_ACTIONS.SET_DATE:
      return {...state, modalEventDateId: action?.payload?.modalEventDateId}
    default:
      return {...state}
  }
}

export const InfiniteTileContextProvider = (props) => {
  const [tileData, dispatchTileData] = useReducer(
    infiniteTileReducer, {
      modalEventDateId: null,
    }
  )
  return (
    <InfiniteTileContext.Provider value={{
      tileData, dispatchTileData,
    }}>{props.children}</InfiniteTileContext.Provider>
  )
}