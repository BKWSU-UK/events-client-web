import React, { useContext } from "react";
import { useTranslation } from "../../i18n";
import EventContext from "../../context/EventContext";

export default function FacebookShareLink({ encodedURL, facebookIcon }) {
  const { t } = useTranslation();
  const { eventsConfig } = useContext(EventContext);
  const facebookShareImage =
    eventsConfig.facebookShareImage || "/assets/images/calendar_facebook.png";
  return (
    <a href={`https://www.facebook.com/sharer.php?u=${encodedURL}`}>
      {!!facebookIcon ? (
        facebookIcon
      ) : (
        <img src={facebookShareImage} alt={t("Share on Facebook")} />
      )}
    </a>
  );
}
