import { useTranslation } from "../i18n";
import { extractFromLocationQuery } from "../utils/urlUtils";
import React, { useContext, useEffect } from "react";
import EventContext from "../context/EventContext";
import { fetchSingleEvent } from "../service/dataAccess";
import Loader from "./loading/Loader";
import { useQuery } from "@tanstack/react-query";
import {extractEventId} from "../utils/paramExtraction";

/**
 * Used to render directly either events or forms.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function DetailRenderer(props) {
  const { t } = useTranslation();

  const eventId = extractEventId(props)

  const { currentEvent, setCurrentEvent } = useContext(EventContext);

  const { isLoading, error, data } = useQuery({
    queryKey: [`event_${eventId}`],
    queryFn: () => fetchSingleEvent(eventId),
  });

  useEffect(() => {
    if (data?.data[0]) {
      setCurrentEvent(data.data[0]);
    }
  }, [data?.data[0]]);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>{t("Could not retrieve event due to an error")}</div>;
  }
  if (!!currentEvent) {
    return (
      <div className={props?.origProps?.className || "container-fluid"}>
        {props.children}
      </div>
    );
  }
  return <div>{t("No event was found")}</div>;
}
