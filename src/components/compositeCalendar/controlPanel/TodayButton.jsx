import React, { useContext } from "react";
import CompositeCalendarContext, {
  CARD_TYPEUI_VIEW,
  DATE_ACTIONS,
} from "../../../context/CompositeCalendarContext";
import { useTranslation } from "../../../i18n";

/**
 * Button used to set the date to today.
 * @returns {JSX.Element}
 * @constructor
 */
const TodayButton = () => {
  const { stateCalendar, dispatchDate } = useContext(CompositeCalendarContext);
  const { t } = useTranslation();

  const setToday = () => {
    dispatchDate({
      type: DATE_ACTIONS.SELECT_SINGLE_DATE,
      payload: { selectedSingleDate: new Date() },
    });
  };

  if (stateCalendar.cardType === CARD_TYPEUI_VIEW.INFINITE_TILES) {
    return null;
  }
  return (
    <button
      type="button"
      className="calendar-today btn btn-info"
      onClick={setToday}
    >
      &#128197; <span className="d-none d-md-inline">{t("today")}</span>
    </button>
  );
};

export default TodayButton;
