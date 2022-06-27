import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/compositeCalendar.css';
import './css/slider.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss'
import { Components } from 'react-formio';
import formio from './components/formio';
import "./i18n";

Components.setComponents(formio);

window.eventsConfig.forEach((eventsConfig, i) => {
    console.log('Rendering app number', i)
    if(!eventsConfig['id']) {
        eventsConfig['id'] = i // Add an id due to React useQuery
    }
    ReactDOM.render(<App eventsConfig={eventsConfig}/>,
        document.getElementById(eventsConfig.rootElement));
})

console.timeEnd('Rendering time')

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
