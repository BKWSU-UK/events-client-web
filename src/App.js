import React from 'react';
import './App.css';
import EventTable from "./components/EventTable";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import About from "./components/About";
import EventDetail from "./components/EventDetail";
import {useTranslation} from "react-i18next";

function App() {

    return (
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
                <Route path="/">
                    <EventTable/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
