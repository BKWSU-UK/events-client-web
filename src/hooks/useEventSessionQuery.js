import { useQuery } from "@tanstack/react-query";
import { fetchEventDateWithSeats } from "../service/dataAccess";

export default function useEventSessionQuery(eventSessionId) {
  const { isLoading, error, data } = useQuery({
    queryKey: [eventSessionId],
    queryFn: () => fetchEventDateWithSeats(eventSessionId),
  });
  return { isLoading, error, data };
}
