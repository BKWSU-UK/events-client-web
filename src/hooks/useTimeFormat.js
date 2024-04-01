import { useContext } from "react";
import EventContext from "../context/EventContext";
import {
  determineDateTimeFormat,
  determineTimeFormat,
} from "../components/DateWidget";

const useTimeFormat = () => {
  const eventContext = useContext(EventContext);
  return determineTimeFormat(eventContext);
};

export const useDateTimeFormat = () => {
  const eventContext = useContext(EventContext);
  return determineDateTimeFormat(eventContext);
};

export default useTimeFormat;
