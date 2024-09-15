import React from "react";
import { VenueDisplay } from "../compositeCalendar/EventDateModal";
import { useTranslation } from "../../i18n";

/**
 * Venue and online link.
 * @constructor
 */
const VenueAndOnlineLink = ({ ev }) => {
  const { t } = useTranslation();
  const inperson = !ev.onlineOnly;
  const online = ev.hasWebcast && ev.webcastUrl.match(/https:\/\/.+/);

  const { webcastUrl } = ev;

  return (
    <div>
      {inperson && <VenueDisplay event={ev} />}
      {online && (
        <div className="row calendar-detail-onlinelink">
          <div className="col-12 card card-body bg-light">
            {webcastUrl?.includes("zoom") ? (
              <button
                className="btn btn-primary"
                onClick={() => (window.location.href = webcastUrl)}
              >
                {t("Join Zoom meeting")}
              </button>
            ) : (
              <a href={webcastUrl}>{webcastUrl}</a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueAndOnlineLink;
