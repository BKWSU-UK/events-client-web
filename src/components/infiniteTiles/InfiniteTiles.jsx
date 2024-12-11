import React, { useContext } from "react";
import EventContext, {
  extractEventListParameters,
} from "../../context/EventContext";
import { getEventListResponse } from "../../service/dataAccess";
import { useInfiniteQuery } from "@tanstack/react-query";
import EventDateImageCard from "../compositeCalendar/card/EventDateImageCard";
import { handleShowEventDate } from "../commonActions";
import {
  INFINITE_ACTIONS,
  InfiniteTileContext,
} from "../../context/InfiniteTileContext";
import useTimeFormat from "../../hooks/useTimeFormat";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import InfiniteScrollLoader from "../loading/InfiniteScrollLoader";
import CompositeCalendarContext from "../../context/CompositeCalendarContext";
import LoaderCircles from "../loading/LoaderCircles";
import { eventTypeIdAdapter } from "../compositeCalendar/adapter/eventTypeIdAdapter";
import { updateOnlineStatus } from "../compositeCalendar/adapter/onlineAdapter";
import { useTranslation } from "../../i18n";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function adaptEventList(data) {
  const flat = data?.pages?.map((page) => page.data ?? page.eventList).flat();
  return flat ?? [];
}

export default function InfiniteTiles(props) {
  const { t } = useTranslation();
  const eventContext = useContext(EventContext);
  const { tileData, dispatchTileData } = useContext(InfiniteTileContext);
  const { stateCalendar, dispatchDate } = useContext(CompositeCalendarContext);
  const timeFormat = useTimeFormat();
  const allParams = extractEventListParameters({ ...props, ...eventContext });
  const { orgId } = allParams;
  const { orgIdFilter, eventsConfig } = eventContext;

  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result
  } = useInfiniteQuery({
    queryKey: [orgId, stateCalendar, orgIdFilter, eventsConfig],
    queryFn: ({ pageParam }) => {
      if (!pageParam) {
        allParams.eventsLimit = allParams.initialPageSize;
        allParams.startRow = 0;
      } else {
        allParams.eventsLimit = pageParam + allParams.initialPageSize;
        allParams.startRow = pageParam;
      }
      const eventTypeIds = eventTypeIdAdapter(
        stateCalendar,
        eventsConfig.eventTypeIds,
      );
      updateOnlineStatus(stateCalendar, eventContext);
      const { searchExpression } = stateCalendar;
      return getEventListResponse({
        ...allParams,
        eventTypeIds,
        eventContext,
        stateCalendar,
        searchExpression,
        ...(orgIdFilter > 0 ? { orgIdFilter } : {}),
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.endRow >= lastPage?.totalRows) {
        return null;
      }
      return lastPage?.endRow;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage?.startRow;
    },
  });

  useInfiniteScroll(() => {
    if (hasNextPage) {
      fetchNextPage();
    } else {
      dispatchTileData({ type: INFINITE_ACTIONS.DISPLAY_NOTHING_MORE });
    }
  });

  const { data, isLoading, error } = result;

  const showEventDate = (e, event) => {
    e.preventDefault();
    handleShowEventDate(eventContext, event, dispatchDate);
  };

  const eventList = adaptEventList(data);

  const hasData = eventList?.length > 0;

  if (!!error) {
    return (
      <div>
        <FontAwesomeIcon
          icon={faCircleExclamation}
          className="fa-1x"
          style={{ color: "#aaaabb" }}
        />{" "}
        {t("No events found")}
      </div>
    );
  }

  return (
    <>
      {isLoading && <LoaderCircles />}
      {!isLoading && !hasData && (
        <div className="container-fluid flex-wrap">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="fa-1x"
            style={{ color: "#aaaabb" }}
          />{" "}
          {t("No events found")}
        </div>
      )}
      {!isLoading && hasData && (
        <div className="container-fluid flex-wrap">
          <div className="row">
            {eventList?.map((event, i) => {
              return (
                <EventDateImageCard
                  key={`${event.id}_${i}`}
                  ev={event}
                  timeFormat={timeFormat}
                  showEventDate={(e) => showEventDate(e, event)}
                  startAfterNow={true}
                />
              );
            })}
          </div>
          {hasData && (
            <InfiniteScrollLoader
              displayNothingMore={tileData.displayNothingMore}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              pages={data?.pages?.length}
            />
          )}
        </div>
      )}
    </>
  );
}
