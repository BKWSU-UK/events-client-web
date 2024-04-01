import TodayButton from "./TodayButton";
import FilterPanel from "../filterPanel/FilterPanel";
import React from "react";
import { switchDateSelectionType } from "./SearchButtonsContainer";
import useOnlineStatus from "../../../hooks/useOnlineStatus";

/**
 * Contains the date and other filters.
 * @returns {JSX.Element}
 * @constructor
 */
const DateAndFilter = () => {
  const [stateCalendar] = useOnlineStatus();
  return (
    <>
      <TodayButton /> {switchDateSelectionType(stateCalendar)}
      <FilterPanel />
    </>
  );
};

export default DateAndFilter;
