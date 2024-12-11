import { fetchEventDateWithSeats } from "../service/dataAccess";
import { useEffect, useState } from "react";

export default function useEventSessionQuery(eventSessionId) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchEventDateWithSeats(eventSessionId)
      .then((r) => {
        setData(r);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [eventSessionId]);

  return { isLoading, error, data };
}
