import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss'
import { Components } from 'react-formio';
import formio from './components/formio';
import "./i18n";

Components.setComponents(formio);

ReactDOM.render(<App />, document.getElementById(window.eventsConfig.rootElement));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
