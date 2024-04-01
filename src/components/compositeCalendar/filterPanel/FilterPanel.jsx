import React from "react";
import CategoryFilter from "./CategoryFilter";
import CenterFilter from "../../filter/CenterFilter";
import SearchFilter from "./SearchFilter";

/**
 * Contains the filters used in the calendar.
 * @constructor
 */
const FilterPanel = () => {
  return (
    <>
      <CategoryFilter />
      <CenterFilter
        renderSelectOnly={true}
        selectionClass="btn btn-primary calendar-center-selector"
        firstOptionText="All locations"
      />
      <SearchFilter />
    </>
  );
};

export default FilterPanel;
