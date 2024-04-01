import { CompositeCalendarContextProvider } from "../../context/CompositeCalendarContext";
import React from "react";
import MultiModeCalendar from "./MultiModeCalendar";
import SearchButtonsContainer from "./controlPanel/SearchButtonsContainer";
import FilterPanel from "./filterPanel/FilterPanel";

/**
 * Wraps the composite calendar around a context provider.
 * @returns {JSX.Element}
 * @constructor
 */
const DateStripCalendarParent = () => {
  return (
    <CompositeCalendarContextProvider>
      <SearchButtonsContainer />
      <MultiModeCalendar />
    </CompositeCalendarContextProvider>
  );
};

export default DateStripCalendarParent;
