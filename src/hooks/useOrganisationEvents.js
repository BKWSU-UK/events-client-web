import { useContext, useEffect } from "react";
import EventContext, { ACTIONS } from "../context/EventContext";

import { getEventList } from "../service/dataAccess";
import { extractParameter } from "../utils/paramExtraction";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_LANGUAGE, GLOBAL_LANGUAGE_KEY } from "./useGlobalLanguage";

/**
 * Hook used to retrieve events based on the organisation id coming from a context.
 * @returns {{events}}
 */
export default function useOrganisationEvents(params) {
  const eventContext = useContext(EventContext);

  const { events, setEvents, orgIdFilter, filterState } = eventContext;

  const { isLoading, error, data } = useQuery({
    queryKey: [
      `eventsTable_${eventContext["eventsConfig"]["id"]}`,
      orgIdFilter,
      filterState,
    ],
    queryFn: () => {
      if (!!orgIdFilter && orgIdFilter > 0) {
        return getEventList({ ...params, orgIdFilter, eventContext });
      } else if (extractParameter({ ...eventContext }, "fetchEvents")) {
        return getEventList({ ...params, eventContext });
      } else {
        return [];
      }
    },
  });

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data, setEvents]);

  useEffect(() => {
    if (window.eventsConfig?.languageListeners) {
      console.log("languageListeners", window.eventsConfig.languageListeners);
      const listener = (newLang) => eventContext.filterDispatch(
        { type: ACTIONS.SET_LANGUAGE_CODE, payload: { languageCode: newLang } }
      );
      window.eventsConfig.languageListeners.push(listener);
      return () => {
        if (window.eventsConfig?.languageListeners) {
          window.eventsConfig.languageListeners = window.eventsConfig.languageListeners
            .filter(l => l !== listener);
        }
      };
    }
  }, [eventContext.filterDispatch]);

  return { events, eventContext, data, isLoading, error };
}
