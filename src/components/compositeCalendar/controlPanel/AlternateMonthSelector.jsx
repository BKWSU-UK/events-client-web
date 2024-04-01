import React from "react";
import { pad2 } from "../../../utils/dateUtils";
import { useTranslation } from "../../../i18n";

const montnMap = {
  1: "month_January",
  2: "month_February",
  3: "month_March",
  4: "month_April",
  5: "month_May",
  6: "month_June",
  7: "month_July",
  8: "month_August",
  9: "month_September",
  10: "month_October",
  11: "month_November",
  12: "month_December",
};

export const ALTERNATE_NUMBER_OF_YEARS = 2;

const AlternateMonthSelector = ({ value, onChangeDate }) => {
  const { t } = useTranslation();
  const fullYear = new Date().getFullYear();
  return (
    <select
      className="btn btn-primary alternate-month-selector"
      value={value}
      onChange={onChangeDate}
    >
      {[...Array(ALTERNATE_NUMBER_OF_YEARS).keys()]
        .map((i) => i + fullYear)
        .flatMap((year) => {
          return [...Array(12).keys()]
            .map((j) => j + 1)
            .map((month) => {
              return (
                <option
                  key={`${month} ${year}`}
                  value={`${year}-${pad2(month)}`}
                >
                  {t(montnMap[month])} {year}
                </option>
              );
            });
        })}
    </select>
  );
};

export default AlternateMonthSelector;
