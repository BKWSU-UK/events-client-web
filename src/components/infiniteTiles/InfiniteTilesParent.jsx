import {InfiniteTileContextProvider} from "../../context/InfiniteTileContext";
import InfiniteTiles from "./InfiniteTiles";
import {CompositeCalendarContextProvider} from "../../context/CompositeCalendarContext";
import EventDateModal from "../compositeCalendar/EventDateModal";
import React from "react";

export default function InfiniteTilesParent(props) {
  return (
    <CompositeCalendarContextProvider>
      <InfiniteTileContextProvider>
        <InfiniteTiles props={props}/>
        <EventDateModal/>
      </InfiniteTileContextProvider>
    </CompositeCalendarContextProvider>
  )
}