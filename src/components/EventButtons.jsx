import React, { useContext } from "react";
import WebcastButton from "./WebcastButton";
import { EVENT_DATE_ID } from "./EventDisplay";
import {
  fetchEventDateList,
  fetchSimilarEventList,
} from "../service/dataAccess";
import { topFunction } from "../utils/scrolling";
import EventContext from "../context/EventContext";
import {
  extractEventLinkFunction,
  extractParameter,
} from "../utils/paramExtraction";
import { EVENT_CONFIG } from "../context/appParams";
import * as rdd from "react-device-detect";

/**
 * Changes the state to display the read more screen.
 * @param footerInfo
 * @param setSimilarEvents
 * @param eventContext The event context
 * @returns {Promise<void>}
 */
export const processReadMoreClick = async (
  footerInfo,
  setSimilarEvents,
  eventContext,
) => {
  debugger;
  const { original } = footerInfo;
  const singleEventUrlTemplate = extractParameter(
    { ...eventContext },
    EVENT_CONFIG.SINGLE_EVENT_URL_TEMPLATE,
  );
  const eventsCalendarFunction = extractEventLinkFunction(
    eventContext.eventsConfig,
  );
  const specialIpadLink = extractParameter(
    { ...eventContext },
    EVENT_CONFIG.SPECIAL_IPAD_TEMPLATE,
  );
  if (rdd.isIPad13 && !!specialIpadLink) {
    window.location.href =
      specialIpadLink.replace(EVENT_DATE_ID, original.id) + "&ipad=true";
  } else if (!!eventsCalendarFunction) {
    debugger;
    window.location.href = eventsCalendarFunction(original);
  } else if (!!singleEventUrlTemplate) {
    let id = original.id;
    if (singleEventUrlTemplate.includes("eventSessionId")) {
      // Use the event date id if the url contains eventSessionId, else just the event id.
      id = original.eventDateId;
    }
    window.location.href = singleEventUrlTemplate.replace(EVENT_DATE_ID, id);
  } else {
    const eventDateId = original.eventDateId;
    await fetchSimilarEventList(eventDateId, setSimilarEvents);
    processReadMore(footerInfo);
  }
};

/**
 * Displays the event buttons with show more, book only and webcast.
 * @param footerInfo
 * @returns {JSX.Element}
 * @constructor
 */
const EventButtons = ({ footerInfo }) => {
  const eventContext = useContext(EventContext);
  const { setSimilarEvents } = eventContext;
  const { original, setCurrentEvent, setDisplayForm, setEventTableVisible, t } =
    footerInfo;

  return (
    <div className="event-buttons">
      <button
        type="button"
        className="btn btn-info"
        onClick={(e) => {
          e.stopPropagation();
          processReadMoreClick(footerInfo, setSimilarEvents, eventContext);
        }}
      >
        {t("read-more")}{" "}
        {original.requiresRegistration ? " " + t("and-book") : ""}
      </button>{" "}
      {original.requiresRegistration &&
      !extractParameter({ ...eventContext }, "suppressBookOnly") ? (
        <button
          type="button"
          className="btn btn-info"
          onClick={(e) => {
            e.stopPropagation();
            console.info("Processing read only click");
            setCurrentEvent(original);
            setDisplayForm(true);
            setEventTableVisible(false);
            gotoTop();
          }}
        >
          {t("book-only")}
        </button>
      ) : (
        ""
      )}{" "}
      <WebcastButton original={original} />
    </div>
  );
};

const processReadMore = (footerInfo) => {
  const {
    original,
    setDisplayMoreAbout,
    setCurrentEvent,
    setDateList,
    setEventTableVisible,
  } = footerInfo;
  setCurrentEvent(original);
  setDisplayMoreAbout(true);
  setEventTableVisible(false);
  fetchEventDateList(setDateList, original.id);
  gotoTop();
};

function gotoTop() {
  topFunction();
}

export default EventButtons;
