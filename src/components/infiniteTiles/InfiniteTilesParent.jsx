import {CompositeCalendarContextProvider} from "../../context/CompositeCalendarContext";
import React from "react";
import InfiniteTilesComponent from "./InfiniteTilesComponent";

export default function InfiniteTilesParent(props) {
  return (
    <CompositeCalendarContextProvider>
      <InfiniteTilesComponent props={props}/>
    </CompositeCalendarContextProvider>
  );
}
