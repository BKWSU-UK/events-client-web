import React from 'react'
import './App.css'
import 'react-big-calendar/lib/sass/styles.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'; // if using DnD
import EventTable from './components/EventTable'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import About from './components/About'
import EventDetail from './components/EventDetail'
import { EventContextProvider } from './context/EventContext'
import EventCalendar from './components/EventCalendar'

function App () {

    return (
        <EventContextProvider>
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
                    <Route path="/calendar/:orgId">
                        <EventCalendar/>
                    </Route>
                    <Route path="/">
                        <EventTable/>
                    </Route>
                </Switch>
            </Router>
        </EventContextProvider>
    )
}

export default App
