import React, {useContext} from "react";
import useGetEventList from "../../hooks/useGetEventList";
import LoadingContainer from "../loading/LoadingContainer";
import HeroTile from "./HeroTile";
import CompositeCalendarContext from "../../context/CompositeCalendarContext";
import SmallTile from "./SmallTile";
import EventContext from "../../context/EventContext";
import {handleShowEventDate} from "../commonActions";

const EVENTS_LIMIT = 10;

const LIMIT = 5;

/**
 * The tiles component.
 * @constructor
 */
const Tiles = () => {
  const { dispatchDate } = useContext(CompositeCalendarContext);
  const eventContext = useContext(EventContext);

  const showEventDate = (e, ev) => {
    e.preventDefault();
    handleShowEventDate(eventContext, ev, dispatchDate);
  };

  const { isLoading, error, data } = useGetEventList(EVENTS_LIMIT);

  return (
    <LoadingContainer data={data} isLoading={isLoading} error={error}>
      <div className="tiles-grid-container-2">
        <HeroTile data={data} showEventDate={showEventDate} />
        <div>
          {data?.slice(1, LIMIT).map((ev, i) => {
            return <SmallTile ev={ev} showEventDate={showEventDate} key={i} />;
          })}
        </div>
      </div>
    </LoadingContainer>
  );
};

export default Tiles;
