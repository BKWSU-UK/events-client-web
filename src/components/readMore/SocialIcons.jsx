import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import React, { useContext, useMemo, useState } from "react";
import EventContext from "../../context/EventContext";
import { useTranslation } from "../../i18n";
import { useDateTimeFormat } from "../../hooks/useTimeFormat";
import { renderDateTimeFromIso } from "../../utils/dateUtils";
import { eventMap } from "../../service/dataAccessConstants";
import { extractImageFromEvent } from "../../utils/imgUtils";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { copyToClipboardModern } from "../../utils/copyClipboard";

const generateMessage = (currentEvent, langCode, dateTimeFormat, eventType) => {
  const dateStr =
    currentEvent.dateList?.length > 0
      ? renderDateTimeFromIso(
          currentEvent.dateList[0].startIso,
          langCode,
          dateTimeFormat,
        )
      : "";
  return `${currentEvent.name}\n${eventType}\n${dateStr}\n`;
};

const generateImage = (currentEvent) => extractImageFromEvent(currentEvent);

export const tableEventToSingleEventAdapter = (currentEvent) => {
  if (!!currentEvent.dateList) {
    return currentEvent;
  }
  return {
    ...currentEvent,
    dateList: [
      {
        eventDateId: currentEvent.eventDateId,
        startIso: currentEvent.startIso,
        endIso: currentEvent.endIso,
      },
    ],
  };
};

/**
 * Contains the social icons.
 * @returns {JSX.Element}
 * @constructor
 */
const SocialIcons = ({ currentEvent, buttonSize = 32 }) => {
  currentEvent = tableEventToSingleEventAdapter(currentEvent);

  const { eventsConfig } = useContext(EventContext);
  const [copyMessage, setCopyMessage] = useState("");
  const { t, langCode } = useTranslation();
  const dateTimeFormat = useDateTimeFormat();

  const currentUrl = window.location.href;

  const generateUrl =
    eventsConfig.generateSocialMedialUrl ??
    ((e) =>
      `https://globalcooperationhouse.org/whatson-full/singleevent/${e.id}`);
  const generateHashtag =
    eventsConfig.generateHashtag ?? ((_) => "brahmakumaris");

  const shareUrl = generateUrl(currentEvent);
  const eventTypeId = currentEvent.eventTypeId;
  const message = useMemo(
    () =>
      generateMessage(
        currentEvent,
        langCode,
        dateTimeFormat,
        t(eventMap[eventTypeId]),
      ),
    [currentEvent.id],
  );
  const eventImage = useMemo(
    () => generateImage(currentEvent),
    [currentEvent.id],
  );

  const copyClipboard = (e) => {
    e.preventDefault();
    copyToClipboardModern(shareUrl);
    setCopyMessage(t("Copied event address to clipboard ..."));
    setTimeout(() => setCopyMessage(""), 10000);
  };

  if (!!eventsConfig.hideSocial) {
    return <></>;
  }

  return (
    <div className="row social-icons">
      <div className="col-12">
        <FacebookShareButton
          url={shareUrl}
          quote={message}
          hashtag={`#${generateHashtag()}`}
          className="facebook share-button"
        >
          <FacebookIcon size={buttonSize} round />
        </FacebookShareButton>{" "}
        <TwitterShareButton
          url={shareUrl}
          title={message}
          hashtags={[generateHashtag()]}
          className="twitter share-button"
        >
          <TwitterIcon size={buttonSize} round />
        </TwitterShareButton>{" "}
        <WhatsappShareButton
          url={shareUrl}
          title={message}
          className="whatsapp share-button"
        >
          <WhatsappIcon size={buttonSize} round />
        </WhatsappShareButton>{" "}
        <LinkedinShareButton url={shareUrl} className="linkedin share-button">
          <LinkedinIcon size={buttonSize} round />
        </LinkedinShareButton>{" "}
        {!!eventImage && (
          <PinterestShareButton
            url={shareUrl}
            media={`${eventImage}`}
            className="pinterest share-button"
          >
            <PinterestIcon size={buttonSize} round />
          </PinterestShareButton>
        )}{" "}
        <RedditShareButton
          url={shareUrl}
          title={message}
          windowWidth={660}
          windowHeight={460}
          className="reddit share-button"
        >
          <RedditIcon size={buttonSize} round />
        </RedditShareButton>{" "}
        <TelegramShareButton
          url={shareUrl}
          title={message}
          className="telegram share-button"
        >
          <TelegramIcon size={buttonSize} round />
        </TelegramShareButton>{" "}
        <FontAwesomeIcon
          icon={faCopy}
          size="2x"
          className="copy-icon"
          onClick={copyClipboard}
        />{" "}
        {copyMessage}
      </div>
    </div>
  );
};

export default SocialIcons;
