import React from 'react'
import './App.css'
import 'react-big-calendar/lib/sass/styles.scss'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css' // if using DnD
import EventTable from './components/EventTable'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import About from './components/About'
import EventDetail from './components/EventDetail'
import { EventContextProvider } from './context/EventContext'
import EventCalendar from './components/EventCalendar'
import { QueryClient, QueryClientProvider } from 'react-query'
import EventForm from './components/EventForm'

// Create a client
const queryClient = new QueryClient()

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
                        <Route path="/event/:eventId">
                            <EventDetail/>
                        </Route>
                        <Route path="/form/:eventId">
                            <EventForm/>
                        </Route>
                        <Route path="/calendar/:orgId">
                            <EventCalendar/>
                        </Route>
                        <Route path="/">
                            {eventsConfig?.showForm ?
                                <EventForm/>
                                : eventsConfig?.showSingleEvent ?
                                    <EventDetail/> :
                                    eventsConfig?.showCalendar ?
                                        <EventCalendar/> : <EventTable/>
                            }
                        </Route>
                    </Switch>
                </Router>
            </EventContextProvider>
        </QueryClientProvider>
    )
}

export default App
