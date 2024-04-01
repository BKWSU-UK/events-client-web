import { eventMap } from "../../../service/dataAccessConstants";
import React from "react";
import { useTranslation } from "../../../i18n";

/**
 * Displays the event type.
 * @constructor
 */
const EventTypeTitle = ({ ev }) => {
  const { t } = useTranslation();

  return (
    <h6 className="calendar-event-type">{t(eventMap[ev?.eventTypeId])}</h6>
  );
};

export default EventTypeTitle;
