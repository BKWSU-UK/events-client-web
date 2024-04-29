import React from "react";

import { fetchEventDateWithSeats } from "../../service/dataAccess";
import LoadingContainer from "../loading/LoadingContainer";
import HeroImage from "./HeroImage";
import EventInfoMain from "./EventInfoMain";
import SpeakerSection from "./SpeakerSection";
import FormLocationSection from "./FormLocationSection";
import VenueAndOnlineLink from "./VenueAndOnlineLink";
import { useQuery } from "@tanstack/react-query";
import useEventSessionQuery from "../../hooks/useEventSessionQuery";

/**
 * Event session display.
 * @constructor
 */
const EventSession = ({ eventSessionId }) => {
  const { isLoading, error, data } = useEventSessionQuery(eventSessionId);

  return (
    <LoadingContainer data={data} isLoading={isLoading} error={error}>
      <HeroImage ev={data} />
      <EventInfoMain ev={data} />
      <SpeakerSection ev={data} />
      <FormLocationSection ev={data} />
      <VenueAndOnlineLink ev={data} />
    </LoadingContainer>
  );
};

export default EventSession;
