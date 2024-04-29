import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./css/compositeCalendar.css";
import "./css/slider.css";
import "./css/eventTiles.css";
import "./css/eventTable.css";
import "./css/form.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import { Components } from "react-formio";
import formio from "./components/formio";
import "./i18n";

Components.setComponents(formio);

window.eventsConfig.forEach((eventsConfig, i) => {
  console.info("Rendering app number", i);
  if (!eventsConfig["id"]) {
    eventsConfig["id"] = i; // Add an id due to React useQuery
  }
  const root = createRoot(document.getElementById(eventsConfig.rootElement));
  root.render(<App eventsConfig={eventsConfig} />);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
