import {useContext} from "react";
import EventContext, {extractEventListParameters} from "../../context/EventContext";
import {getEventListResponse} from "../../service/dataAccess";
import {useInfiniteQuery} from "@tanstack/react-query";
import LoadingPlaceHolder from "../loading/LoadingPlaceHolder";
import EventDateImageCard from "../compositeCalendar/card/EventDateImageCard";
import {handleShowEventDate} from "../commonActions";
import {InfiniteTileContext} from "../../context/InfiniteTileContext";
import useTimeFormat from "../../hooks/useTimeFormat";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const INITIAL_PAGE_SIZE = 12

export default function InfiniteTiles(props) {
  const eventContext = useContext(EventContext)
  const {tileData, dispatchTileData} = useContext(InfiniteTileContext)
  const timeFormat = useTimeFormat()
  const allParams = extractEventListParameters({...props, ...eventContext})
  const {setEvents, eventsConfig} = eventContext
  const {orgId} = allParams

  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result
  } = useInfiniteQuery({
    queryKey: [orgId],
    queryFn: ({pageParam}) => {
      if(!pageParam) {
        allParams.eventsLimit = INITIAL_PAGE_SIZE
        allParams.startRow = 0
      } else {
        allParams.eventsLimit = pageParam + INITIAL_PAGE_SIZE
        allParams.startRow = pageParam
      }
      console.log('startRow, eventsLimit', allParams.startRow, allParams.eventsLimit)
      return getEventListResponse({...allParams, eventContext})
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.endRow
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage?.startRow
    }
  })

  useInfiniteScroll(() => {
    if (hasNextPage) {
      fetchNextPage()
    }
  })

  const {data, isLoading, error} = result

  const showEventDate = (e, event) => {
    e.preventDefault()
    handleShowEventDate(eventContext, event, dispatchTileData)
  }

  return (
    <LoadingPlaceHolder data={data} isLoading={isLoading} error={error}>
      <div className="container-fluid flex-wrap">
        <div className="row">
          {data?.pages?.map(page => {
            const {data: eventList} = page
            return eventList.map((event, i) => {
              return <EventDateImageCard key={`${event.id}_${i}`} ev={event} timeFormat={timeFormat}
                                         showEventDate={(e) => showEventDate(e, event)}
                                         startAfterNow={true}/>
            })
          })}
        </div>
      </div>
    </LoadingPlaceHolder>
  )
}