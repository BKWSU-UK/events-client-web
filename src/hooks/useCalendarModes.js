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
import {COMPOSITE_CALENDAR_PARAMS} from "../context/appParams";

const CARD_TYPE_KEY = "cardType";

/**
 * Used to return the funcalendar modes and a function to activate a specific one.
 * @returns {[[{func: function(): void, cardType: number, label: string}, {func: function(): void, cardType: number, label: string}, {func: function(): void, cardType: number, label: string}, {func: function(): void, cardType: number, label: string}, {func: function(): void, cardType: number, label: string}], function(*): *]}
 */
const useCalendarModes = () => {
  const { stateCalendar, dispatchDate } = useContext(CompositeCalendarContext);
  const eventContext = useContext(EventContext);
  const showWeek =
    extractParameter({ ...eventContext }, COMPOSITE_CALENDAR_PARAMS.SHOW_WEEK);
  const showDay =
    extractParameter({ ...eventContext }, COMPOSITE_CALENDAR_PARAMS.SHOW_DAY);
  const showImageCards =
    extractParameter({ ...eventContext }, COMPOSITE_CALENDAR_PARAMS.SHOW_IMAGE_CARDS);
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

  const activateTable = useCallback(() => setCardType(CARD_TYPEUI_VIEW.IMAGE_CARD), [setCardType]);

  const activateAgenda = useCallback(() => setCardType(CARD_TYPEUI_VIEW.LONG_CARD), [setCardType]);

  const activateMonth = useCallback(() => {
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
  }, [dispatchDate, stateCalendar.selectedSingleDate]);

  const activateWeek = useCallback(() => {
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
  }, [dispatchDate, stateCalendar.selectedSingleDate]);

  const activateDay = useCallback(() => {
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
  }, [dispatchDate, stateCalendar.selectedSingleDate, stateCalendar.visibleDateStart])

  const activateInfiniteTiles = useCallback(() => setCardType(CARD_TYPEUI_VIEW.INFINITE_TILES), [setCardType]);

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
      ...showImageCards ? [{
        cardType: CARD_TYPEUI_VIEW.IMAGE_CARD,
        func: activateTable,
        label: "Image cards",
        icon: faTable,
      }] : [],
      {
        cardType: CARD_TYPEUI_VIEW.INFINITE_TILES,
        func: activateInfiniteTiles,
        label: "Table",
        icon: faTable,
      }
    ],
    [activateAgenda, activateDay, activateMonth, activateTable, activateWeek, showDay, showWeek]
  );

  return [calendarModes, activeOnType, t];
};

export default useCalendarModes;
