import React from "react";
import "./App.css";
import "react-big-calendar/lib/sass/styles.scss";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"; // if using DnD
// Default theme
import "@splidejs/react-splide/css";

import EventTable from "./components/EventTable";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/About";
import EventDetail from "./components/EventDetail";
import { EventContextProvider } from "./context/EventContext";
import EventCalendar from "./components/EventCalendar";
import EventForm from "./components/EventForm";
import DateStripCalendarParent from "./components/compositeCalendar/CompositeCalendarParent";
import SliderParent from "./components/slider/SliderParent";
import TilesParent from "./components/tiles/TilesParent";
import EventSessionParent from "./components/singleEventSession/EventSessionParent";
import EventCountdownMain from "./components/countDown/EventCountdownMain";
import EventsMonthCalendar from "./components/eventsMonthCalendar/EventsMonthCalendar";
import ImageBanner from "./components/imageBanner/ImageBanner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InfiniteTiles from "./components/infiniteTiles/InfiniteTiles";
import InfiniteTilesParent from "./components/infiniteTiles/InfiniteTilesParent";
import EventSession from "./components/singleEventSession/EventSession";
import ExtendedSingleEventSession from "./components/singleEventSession/ExtendedSingleEventSession";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

const WIDGET_TYPE = {
  TABLE: "TABLE",
  CALENDAR: "CALENDAR",
  EVENTS_MONTH_CALENDAR: "EVENTS_MONTH_CALENDAR",
  SINGLE_EVENT: "SINGLE_EVENT",
  SINGLE_EVENT_SESSION: "SINGLE_EVENT_SESSION",
  EXTENDED_SINGLE_EVENT_SESSION: "EXTENDED_SINGLE_EVENT_SESSION",
  FORM: "FORM",
  COMPOSITE_CALENDAR: "COMPOSITE_CALENDAR",
  SLIDER: "SLIDER",
  TILES: "TILES",
  EVENT_COUNT_DOWN: "EVENT_COUNT_DOWN",
  IMAGE_BANNER: "IMAGE_BANNER",
  INFINITE_TILES: "INFINITE_TILES",
};

const chooseComponent = (eventsConfig) => {
  switch (eventsConfig.widgetType) {
    case WIDGET_TYPE.TABLE:
      return <EventTable />;
    case WIDGET_TYPE.CALENDAR:
      return <EventCalendar />;
    case WIDGET_TYPE.EVENTS_MONTH_CALENDAR:
      return <EventsMonthCalendar />;
    case WIDGET_TYPE.SINGLE_EVENT:
      return <EventDetail />;
    case WIDGET_TYPE.SINGLE_EVENT_SESSION:
      return <EventSessionParent EventSessionComponent={EventSession} />;
    case WIDGET_TYPE.EXTENDED_SINGLE_EVENT_SESSION:
      return (
        <EventSessionParent
          EventSessionComponent={ExtendedSingleEventSession}
        />
      );
    case WIDGET_TYPE.FORM:
      return <EventForm />;
    case WIDGET_TYPE.COMPOSITE_CALENDAR:
      return <DateStripCalendarParent />;
    case WIDGET_TYPE.SLIDER:
      return <SliderParent />;
    case WIDGET_TYPE.TILES:
      return <TilesParent />;
    case WIDGET_TYPE.EVENT_COUNT_DOWN:
      return <EventCountdownMain />;
    case WIDGET_TYPE.IMAGE_BANNER:
      return <ImageBanner />;
    case WIDGET_TYPE.INFINITE_TILES:
      return <InfiniteTilesParent />;
    default:
      // Legacy configurations
      if (eventsConfig?.showForm) {
        return <EventForm />;
      }
      if (eventsConfig?.showSingleEvent) {
        return <EventDetail />;
      }
      if (eventsConfig?.showCalendar) {
        return <EventCalendar />;
      }
      if (eventsConfig?.showCompositeCalendar) {
        return <DateStripCalendarParent />;
      }
      return <EventTable />;
  }
};

function App({ eventsConfig }) {
  return (
    <QueryClientProvider client={queryClient}>
      <EventContextProvider eventsConfig={eventsConfig}>
        <Router>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/events/:orgId">
              <EventTable />
            </Route>
            <Route path="/events-month-calendar/:orgId">
              <EventTable />
            </Route>
            <Route path="/event/:eventId">
              <EventDetail />
            </Route>
            <Route path="/form/:eventId">
              <EventForm />
            </Route>
            <Route path="/calendar/:orgId">
              <EventCalendar />
            </Route>
            <Route path="/composite-calendar">
              <DateStripCalendarParent />
            </Route>
            <Route path="/single-event-session">
              <EventSessionParent />
            </Route>
            <Route path="/event-countdown">
              <EventCountdownMain />
            </Route>
            <Route path="/slider">
              <SliderParent />
            </Route>
            <Route path="/image-banner">
              <ImageBanner />
            </Route>
            <Route path="/infinite-tiles">
              <InfiniteTiles />
            </Route>
            <Route path="/">{chooseComponent(eventsConfig)}</Route>
          </Switch>
        </Router>
      </EventContextProvider>
    </QueryClientProvider>
  );
}

export default App;
