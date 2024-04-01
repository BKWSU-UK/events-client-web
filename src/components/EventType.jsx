import React from "react";

import { useTranslation } from "../i18n";
import { eventMap } from "../service/dataAccessConstants";

export default function EventType({ eventTypeInt, useLead = true }) {
  const { t } = useTranslation();
  let eventTypeExpression = t(eventMap[eventTypeInt]);
  return useLead ? (
    <p className="lead">{eventTypeExpression}</p>
  ) : (
    <>{eventTypeExpression}</>
  );
}
