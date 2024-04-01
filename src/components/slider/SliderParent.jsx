import React from "react";
import { CompositeCalendarContextProvider } from "../../context/CompositeCalendarContext";
import EventSlider from "./EventSlider";
import EventDateModal from "../compositeCalendar/EventDateModal";

/**
 * Slider parent component used to wrap the context around the main component.
 * @returns {JSX.Element}
 * @constructor
 */
const SliderParent = () => {
  return (
    <CompositeCalendarContextProvider>
      <EventSlider />
      <EventDateModal />
    </CompositeCalendarContextProvider>
  );
};

export default SliderParent;
