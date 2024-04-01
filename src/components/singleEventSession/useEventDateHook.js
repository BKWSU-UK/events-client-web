import { useTranslation } from "../../i18n";
import { useContext } from "react";
import EventContext from "../../context/EventContext";
import { eventDateAdapter } from "../../utils/dateUtils";

/**
 * Hook used with event dates.
 */
const useEventDateHook = (ev) => {
  const { langCode } = useTranslation();
  const { eventsConfig } = useContext(EventContext);
  const adaptedEventDate = eventDateAdapter(ev);

  return { langCode, eventsConfig, adaptedEventDate };
};

export default useEventDateHook;
