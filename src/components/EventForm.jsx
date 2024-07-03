import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import DetailRenderer from "./DetailRenderer";
import { IncludeForm } from "./forms/FormModal";
import EventContext from "../context/EventContext";
import { RenderDate, venueFactory } from "./readMore/ReadMore";
import useTimeFormat from "../hooks/useTimeFormat";
import useLanguage from "../hooks/useLanguage";
import { extractParameter } from "../utils/paramExtraction";
import {convertToSet} from "../utils/tagsAdapter";
import {TAGS} from "../context/appParams";

function ImageDisplay({ tags, tag, image, eventName }) {
  if((tags.has(tag)) && image) {
    return <div className="row mb-3 mt-3 mx-2">
      <img className="img-fluid w-100" src={`https://events.brahmakumaris.org${image}`} alt={eventName}/>
    </div>
  }
  return null
}

function EventDisplay({ currentEvent }) {
  const timeFormat = useTimeFormat();

  const hideEventDate = extractParameter(null, "hideEventDate", false);
  const showShortDescription = extractParameter(
    null,
    "showShortDescription",
    false,
  );

  useLanguage();
  if (!!currentEvent) {
    const date =
      currentEvent.dateList && currentEvent.dateList.length > 0
        ? currentEvent.dateList[0]
        : null;
    const tags = convertToSet(currentEvent)
    const eventName = currentEvent.name
    if (!!date) {
      return (
        <>
          <h2>{eventName}</h2>
          {!!currentEvent.subTitle && <h3>{currentEvent.subTitle}</h3>}
          {showShortDescription && (
            <div className="row mb-3 mt-3">
              <div className="col-12">{currentEvent.shortDescription}</div>
            </div>
          )}
          <ImageDisplay tags={tags} tag={TAGS.SHOW_IMAGE_1} image={currentEvent.image1} eventName={eventName} />
          <ImageDisplay tags={tags} tag={TAGS.SHOW_IMAGE_2} image={currentEvent.image2} eventName={eventName} />
          <ImageDisplay tags={tags} tag={TAGS.SHOW_IMAGE_3} image={currentEvent.image3} eventName={eventName} />
          {(!hideEventDate && !tags.has(TAGS.HIDE_DATE)) && (
            <div className="row mb-3 mt-3">
              <div className="col-12">
                <RenderDate
                  date={date}
                  currentEvent={venueFactory(currentEvent)}
                  timeFormat={timeFormat}
                />
              </div>
            </div>
          )}
        </>
      );
    }
  }
  return <></>;
}

/**
 * Displays an event using the event identifier.
 * @param props Contains router related properties we might want to keep.
 * @returns {JSX.Element}
 * @constructor
 */
function EventForm(props) {
  const { currentEvent } = useContext(EventContext);

  return (
    <DetailRenderer origProps={{ ...props }}>
      <EventDisplay currentEvent={currentEvent} />
      <IncludeForm currentEvent={currentEvent} className="col-12 pl-1 pr-1" />
    </DetailRenderer>
  );
}

export default withRouter(EventForm);
