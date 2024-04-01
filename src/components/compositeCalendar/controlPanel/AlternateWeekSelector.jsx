import React, { useMemo } from "react";
import { weekListInYears } from "../../../utils/dateUtils";
import { ALTERNATE_NUMBER_OF_YEARS } from "./AlternateMonthSelector";
import moment from "moment";

/**
 * Week selector for browsers which do not support the input type week element.
 * @constructor
 */
const AlternateWeekSelector = ({ value, onChange }) => {
  const weeks = useMemo(
    () => weekListInYears(ALTERNATE_NUMBER_OF_YEARS),
    [ALTERNATE_NUMBER_OF_YEARS],
  );
  const momentWeeks = weeks.map((w) => moment(w).format("dddd DD MMMM YYYY"));
  return (
    <select
      className="btn btn-primary alternate-weeks-selector"
      value={value}
      onChange={onChange}
    >
      {weeks.map((w, i) => {
        return (
          <option
            key={`${w}`}
            value={`${w}`}
          >{`${w} : ${momentWeeks[i]}`}</option>
        );
      })}
    </select>
  );
};

export default AlternateWeekSelector;
