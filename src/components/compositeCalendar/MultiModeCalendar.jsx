import React, { useContext } from "react";
/**
 * Contains multiple calendar views
 * @constructor
 */
import DateStrip from "./dateStrip/DateStrip";
import EventDateDisplay, {
  SingleDateQueryAdapter,
  SingleDayQueryAdapter,
} from "./EventDayDisplay";
import DatePeriod from "./DatePeriod";
import SingleDateTitle from "./SingleDateTitle";
import EventDateModal from "./EventDateModal";
import CompositeCalendarContext, {
  CARD_TYPEUI_VIEW,
} from "../../context/CompositeCalendarContext";
import ClassicCalendar from "./ClassicCalendar";
import { MultiDateQueryAdapter } from "./adapter/multidateQueryAdapter";
import InfiniteTilesComponent from "../infiniteTiles/InfiniteTilesComponent";

function InfiniteTilesWrapper() {
  return (
    <div className="mt-4">
      <InfiniteTilesComponent />
    </div>
  );
}

const renderDateComponents = (adapter) => {
  return (
    <>
      <DateStrip />
      <SingleDateTitle />
      <EventDateDisplay adapter={adapter} hideMissing={true} />
      <EventDateModal />
    </>
  );
};

const renderSwitch = (stateCalendar) => {
  switch (stateCalendar.cardType) {
    case CARD_TYPEUI_VIEW.LONG_CARD:
    case CARD_TYPEUI_VIEW.IMAGE_CARD:
      return (
        <>
          {renderDateComponents(new SingleDateQueryAdapter())}
          <DatePeriod />
          <EventDateDisplay
            adapter={new MultiDateQueryAdapter()}
            hideMissing={false}
          />
        </>
      );
    case CARD_TYPEUI_VIEW.MONTH:
    case CARD_TYPEUI_VIEW.WEEK:
      return (
        <>
          <ClassicCalendar />
          <EventDateModal />
        </>
      );
    case CARD_TYPEUI_VIEW.DAY:
      return renderDateComponents(new SingleDayQueryAdapter());
    case CARD_TYPEUI_VIEW.INFINITE_TILES:
      return <InfiniteTilesWrapper />;
    default:
      return <InfiniteTilesWrapper />;
  }
};

/**
 * Calendar used to display events in a period or on a specific day.
 * @returns {JSX.Element}
 * @constructor
 */
const MultiModeCalendar = () => {
  const compositeCalendarContext = useContext(CompositeCalendarContext);
  const { stateCalendar } = compositeCalendarContext;

  return <div className="container-fluid">{renderSwitch(stateCalendar)}</div>;
};

export default MultiModeCalendar;
