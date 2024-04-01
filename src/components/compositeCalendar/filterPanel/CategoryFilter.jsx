import React, { useContext } from "react";
import { eventMap } from "../../../service/dataAccessConstants";
import { useTranslation } from "../../../i18n";
import CompositeCalendarContext, {
  ALL_CATEGORIES,
  DATE_ACTIONS,
} from "../../../context/CompositeCalendarContext";

/**
 * Contains the event categories for which you can filter the events.
 * @constructor
 */
const CategoryFilter = () => {
  const compositeCalendarContext = useContext(CompositeCalendarContext);
  const { stateCalendar, dispatchDate } = compositeCalendarContext;
  const { t } = useTranslation();

  const categories = { [ALL_CATEGORIES]: "All categories", ...eventMap };

  const onChange = (e) => {
    dispatchDate({
      type: DATE_ACTIONS.CHANGE_CATEGORY_FILTER,
      payload: {
        categoryFilter: parseInt(e.target.value),
      },
    });
  };

  return (
    <select
      className="btn btn-primary calendar-category-selector"
      value={stateCalendar.categoryFilter}
      onChange={onChange}
    >
      {Object.entries(categories).map((e, i) => {
        return (
          <option key={i} value={e[0]}>
            {t(e[1])}
          </option>
        );
      })}
    </select>
  );
};

export default CategoryFilter;
