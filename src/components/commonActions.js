import { extractParameter } from "../utils/paramExtraction";
import {EVENT_CONFIG, LINK_NAME_FUNC} from "../context/appParams";
import { EVENT_DATE_ID } from "./EventDisplay";
import { DATE_ACTIONS } from "../context/CompositeCalendarContext";
import { extractImageFromEvent } from "../utils/imgUtils";

export const handleShowEventDate = (eventContext, ev, dispatchDate) => {
  const singleEventUrlTemplate = extractParameter(
    { ...eventContext },
    EVENT_CONFIG.SINGLE_EVENT_URL_TEMPLATE,
  );
  const eventsCalendarFunction = extractParameter(
      { ...eventContext },
      LINK_NAME_FUNC,
  );
  const eventDateId = ev.eventDateId || ev.original?.eventDateId;
  if (singleEventUrlTemplate || eventsCalendarFunction) {
    const image = extractImageFromEvent(ev);
    if(eventsCalendarFunction) {
      window.location.href = eventsCalendarFunction(ev)
    } else {
      window.location.href =
          singleEventUrlTemplate.replace(EVENT_DATE_ID, eventDateId) +
          `&startDateTime=${window.encodeURI(ev.startIso)}` +
          `&endDateTime=${window.encodeURI(ev.endIso)}` +
          `&title=${window.encodeURI(ev.name)}` +
          (!!image ? `&image=${window.encodeURI(image)}` : "");
    }
  } else {
    dispatchDate({
      type: DATE_ACTIONS.SHOW_MODAL_EVENT_DATE,
      payload: { modalEventDateId: eventDateId },
    });
  }
};
