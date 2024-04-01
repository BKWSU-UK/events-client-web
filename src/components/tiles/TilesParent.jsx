import { CompositeCalendarContextProvider } from "../../context/CompositeCalendarContext";
import React from "react";
import Tiles from "./Tiles";
import EventDateModal from "../compositeCalendar/EventDateModal";

/**
 * Parent component for the tiles.
 * @constructor
 */
const TileParent = () => {
  return (
    <CompositeCalendarContextProvider>
      <Tiles />
      <EventDateModal />
    </CompositeCalendarContextProvider>
  );
};

export default TileParent;
