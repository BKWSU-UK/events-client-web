import React, { useContext } from "react";
import linkifyHtml from "linkifyjs/html";
import EventContext from "../../../context/EventContext";

const MAX_LINK_LENGTH = 30;

const EventExtraInfo = ({ currentEvent, limit = 70, linkify = false }) => {
  const { eventsConfig } = useContext(EventContext);
  const tileMaxLinkLength = eventsConfig.tileMaxLinkLength || MAX_LINK_LENGTH;

  let text =
    currentEvent.shortDescription ||
    currentEvent.subTitle ||
    currentEvent.descriptionText;
  if (text?.length > limit) {
    text = `${text.slice(0, limit)} ...`;
  }
  if (linkify) {
    text = linkifyHtml(text, {
      defaultProtocol: "https",
      format: (value) => {
        return value.length > tileMaxLinkLength
          ? value.slice(0, tileMaxLinkLength) + "…"
          : value;
      },
    });
  }
  return (
    <div className="row event-extra-info">
      <div
        className="col-12 text-muted mt-1"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
};

export default EventExtraInfo;
