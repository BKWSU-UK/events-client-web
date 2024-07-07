import {InfiniteTileContextProvider} from "../../context/InfiniteTileContext";
import InfiniteTiles from "./InfiniteTiles";
import EventDateModal from "../compositeCalendar/EventDateModal";
import React from "react";

/**
 * Contains the context and the infinite tiles component.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function InfiniteTilesComponent(props) {
  return (
    <InfiniteTileContextProvider>
      <InfiniteTiles props={props}/>
      <EventDateModal/>
    </InfiniteTileContextProvider>
  );
}