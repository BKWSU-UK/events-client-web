import React from 'react'
import './App.css'
import 'react-big-calendar/lib/sass/styles.scss'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css' // if using DnD
// Default theme
import '@splidejs/react-splide/dist/css/splide-core.min.css'
import '@splidejs/react-splide/dist/css/themes/splide-default.min.css'

import EventTable from './components/EventTable'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import About from './components/About'
import EventDetail from './components/EventDetail'
import { EventContextProvider } from './context/EventContext'
import EventCalendar from './components/EventCalendar'
import { QueryClient, QueryClientProvider } from 'react-query'
import EventForm from './components/EventForm'
import DateStripCalendarParent
    from './components/compositeCalendar/CompositeCalendarParent'
import SliderParent from './components/slider/SliderParent'
import TilesParent from './components/tiles/TilesParent'
import EventSessionParent
    from './components/singleEventSession/EventSessionParent'
import EventCountdownMain from './components/countDown/EventCountdownMain'
import EventsMonthCalendar
    from './components/eventsMonthCalendar/EventsMonthCalendar'

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
        },
    },
})

const WIDGET_TYPE = {
    TABLE: "TABLE",
    CALENDAR: "CALENDAR",
    EVENTS_MONTH_CALENDAR: "EVENTS_MONTH_CALENDAR",
    SINGLE_EVENT: "SINGLE_EVENT",
    SINGLE_EVENT_SESSION: "SINGLE_EVENT_SESSION",
    FORM: "FORM",
    COMPOSITE_CALENDAR: "COMPOSITE_CALENDAR",
    SLIDER: "SLIDER",
    TILES: "TILES",
    EVENT_COUNT_DOWN: "EVENT_COUNT_DOWN"
}

const chooseComponent = (eventsConfig) => {
    switch(eventsConfig.widgetType) {
        case WIDGET_TYPE.TABLE:
            return <EventTable/>
        case WIDGET_TYPE.CALENDAR:
            return <EventCalendar/>
        case WIDGET_TYPE.EVENTS_MONTH_CALENDAR:
            return <EventsMonthCalendar/>
        case WIDGET_TYPE.SINGLE_EVENT:
            return <EventDetail/>
        case WIDGET_TYPE.SINGLE_EVENT_SESSION:
            return <EventSessionParent />
        case WIDGET_TYPE.FORM:
            return <EventForm/>
        case WIDGET_TYPE.COMPOSITE_CALENDAR:
            return <DateStripCalendarParent/>
        case WIDGET_TYPE.SLIDER:
            return <SliderParent />
        case WIDGET_TYPE.TILES:
            return <TilesParent />
        case WIDGET_TYPE.EVENT_COUNT_DOWN:
            return <EventCountdownMain/>
    }
    // Legacy configurations
    if (eventsConfig?.showForm) {
        return <EventForm/>
    }
    if (eventsConfig?.showSingleEvent) {
        return <EventDetail/>
    }
    if (eventsConfig?.showCalendar) {
        return <EventCalendar/>
    }
    if (eventsConfig?.showCompositeCalendar) {
        return <DateStripCalendarParent/>
    }
    return <EventTable/>
}

function App ({ eventsConfig }) {

    return (
        <QueryClientProvider client={queryClient}>
            <EventContextProvider eventsConfig={eventsConfig}>
                <Router>
                    <Switch>
                        <Route path="/about">
                            <About/>
                        </Route>
                        <Route path="/events/:orgId">
                            <EventTable/>
                        </Route>
                        <Route path="/events-month-calendar/:orgId">
                            <EventTable/>
                        </Route>
                        <Route path="/event/:eventId">
                            <EventDetail/>
                        </Route>
                        <Route path="/form/:eventId">
                            <EventForm/>
                        </Route>
                        <Route path="/calendar/:orgId">
                            <EventCalendar/>
                        </Route>
                        <Route path="/composite-calendar">
                            <DateStripCalendarParent/>
                        </Route>
                        <Route path="/single-event-session">
                            <EventSessionParent/>
                        </Route>
                        <Route path="/event-countdown">
                            <EventCountdownMain/>
                        </Route>
                        <Route path="/slider">
                            <SliderParent />
                        </Route>
                        <Route path="/">
                            {chooseComponent(eventsConfig)}
                        </Route>
                    </Switch>
                </Router>
            </EventContextProvider>
        </QueryClientProvider>
    )
}

export default App
