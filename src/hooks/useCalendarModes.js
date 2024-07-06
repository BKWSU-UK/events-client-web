import {useCallback, useContext, useEffect, useMemo} from "react";
import CompositeCalendarContext, {
  CARD_TYPEUI_VIEW,
  DATE_ACTIONS,
} from "../context/CompositeCalendarContext";
import { useTranslation } from "../i18n";
import { monthStartAndEnd, weekStartAndEnd } from "../utils/dateUtils";
import {
  faCalendar,
  faCalendarWeek,
  faCalendarDays,
  faCalendarDay,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import {extractParameter} from "../utils/paramExtraction";
import EventContext from "../context/EventContext";

const CARD_TYPE_KEY = "cardType";

/**
 * Used to return the funcalendar modes and a function to activate a specific one.
 * @returns {[[{func: function(): void, cardType: number, label: string}, {func: function(): void, cardType: number, label: string}, {func: function(): void, cardType: number, label: string}, {func: function(): void, cardType: number, label: string}, {func: function(): void, cardType: number, label: string}], function(*): *]}
 */
const useCalendarModes = () => {
  const { stateCalendar, dispatchDate } = useContext(CompositeCalendarContext);
  const eventContext = useContext(EventContext);
  const showWeek =
    extractParameter({ ...eventContext }, "compositeCalendar_showWeek");
  const showDay =
    extractParameter({ ...eventContext }, "compositeCalendar_showDay");
  const { t } = useTranslation();

  const setCardType = useCallback((cardType) => {
    dispatchDate({
      type: DATE_ACTIONS.CHANGE_CARD_TYPE,
      payload: { cardType },
    });
    window.localStorage.setItem(CARD_TYPE_KEY, cardType);
  }, [dispatchDate]);

  useEffect(() => {
    const cardType = window.localStorage.getItem(CARD_TYPE_KEY);
    if (!!cardType) {
      setCardType(parseInt(cardType));
    }
  }, []);

  const activateTable = () => setCardType(CARD_TYPEUI_VIEW.IMAGE_CARD);

  const activateAgenda = () => setCardType(CARD_TYPEUI_VIEW.LONG_CARD);

  const activateMonth = () => {
    const { monthStart, monthEnd } = monthStartAndEnd(
      stateCalendar.selectedSingleDate,
    );
    dispatchDate({
      type: DATE_ACTIONS.SELECT_MONTH,
      payload: {
        selectedSingleDate: monthStart,
        visibleDateStart: monthStart,
        visibleDateEnd: monthEnd,
      },
    });
    window.localStorage.setItem(CARD_TYPE_KEY, CARD_TYPEUI_VIEW.MONTH);
  };

  const activateWeek = () => {
    const { weekStart, weenEnd } = weekStartAndEnd(
      stateCalendar.selectedSingleDate,
    );
    dispatchDate({
      type: DATE_ACTIONS.SELECT_WEEK,
      payload: {
        selectedSingleDate: weekStart,
        visibleDateStart: weekStart,
        visibleDateEnd: weenEnd,
      },
    });
    window.localStorage.setItem(CARD_TYPE_KEY, CARD_TYPEUI_VIEW.WEEK);
  };

  const activateDay = () => {
    const uniqueDate =
      stateCalendar.selectedSingleDate ||
      stateCalendar.visibleDateStart ||
      new Date();
    dispatchDate({
      type: DATE_ACTIONS.SELECT_DAY,
      payload: {
        selectedSingleDate: uniqueDate,
        visibleDateStart: uniqueDate,
        visibleDateEnd: uniqueDate,
      },
    });
    window.localStorage.setItem(CARD_TYPE_KEY, CARD_TYPEUI_VIEW.DAY);
  };

  const activeOnType = (cardType) =>
    stateCalendar.cardType === cardType && "active";

  const calendarModes = useMemo(
    () => [
      {
        cardType: CARD_TYPEUI_VIEW.LONG_CARD,
        func: activateAgenda,
        label: "Agenda",
        icon: faCalendar,
      },
      {
        cardType: CARD_TYPEUI_VIEW.MONTH,
        func: activateMonth,
        label: "month",
        icon: faCalendarDays,
      },
      ...showWeek ? [{
        cardType: CARD_TYPEUI_VIEW.WEEK,
        func: activateWeek,
        label: "week",
        icon: faCalendarWeek,
      }] : [],
      ...showDay ? [{
        cardType: CARD_TYPEUI_VIEW.DAY,
        func: activateDay,
        label: "day",
        icon: faCalendarDay,
      }] : [],
      {
        cardType: CARD_TYPEUI_VIEW.IMAGE_CARD,
        func: activateTable,
        label: "Table",
        icon: faTable,
      },
    ],
    [],
  );

  return [calendarModes, activeOnType, t];
};

export default useCalendarModes;
