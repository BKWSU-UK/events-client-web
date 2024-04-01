import { useContext } from "react";
import EventContext, {
  extractEventListParameters,
} from "../context/EventContext";
import useOrganisationEvents from "./useOrganisationEvents";

/**
 * Returns all organisation events and the context associated with them.
 */
export default function useOrganisationEventsWithContext(props) {
  const eventContext = useContext(EventContext);
  const { eventsConfig } = eventContext;
  const allParams = extractEventListParameters({ ...props, ...eventContext });
  const { events, data, isLoading, error } = useOrganisationEvents(allParams);
  return { events, data, isLoading, error, eventContext, eventsConfig };
}
