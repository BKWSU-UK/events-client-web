import useEventSessionQuery from "../../hooks/useEventSessionQuery";
import LoadingContainer from "../loading/LoadingContainer";
import React, { useContext, useEffect, useMemo } from "react";
import {
  dateListAdapter,
  tagsAdapter,
  venueEventAdapter,
} from "../../utils/singleEventSessionAdapters";
import useTimeFormat from "../../hooks/useTimeFormat";
import { ReadMore } from "../readMore/ReadMore";
import EventContext from "../../context/EventContext";

/**
 * Event session display with modifications.
 * @param eventSessionId The event session identifier.
 * @constructor
 */
export default function ExtendedSingleEventSession({ eventSessionId }) {
  const { isLoading, error, data } = useEventSessionQuery(eventSessionId);
  const { setCurrentEvent } = useContext(EventContext);
  const dateList = useMemo(() => dateListAdapter(data), [data]);

  useEffect(() => {
    const venueEvent = venueEventAdapter(data);
    const tags = data?.tagsString;
    setCurrentEvent({ ...data, ...venueEvent, tags });
  }, [data]);

  return (
    <LoadingContainer data={data} isLoading={isLoading} error={error}>
      {data && (
        <div className="container-fluid">
          <ReadMore dateList={dateList} />
        </div>
      )}
    </LoadingContainer>
  );
}
