import React, { useContext } from "react";
import makeModal from "../simpleModal/makeModal";
import { useTranslation } from "../../i18n";

import { fetchSeatInformation } from "../../service/dataAccess";
import CreateForm from "./CreateForm";
import EventContext from "../../context/EventContext";
import { useQuery } from "@tanstack/react-query";

export const useSeatInformation = (currentEvent) => {
  const eventDateId = currentEvent
    ? currentEvent?.eventDateId
      ? currentEvent?.eventDateId
      : currentEvent?.dateList && currentEvent?.dateList.length
        ? currentEvent?.dateList[0].eventDateId
        : -1
    : -1;
  const { isLoading, error, data } = useQuery({
    queryKey: [eventDateId],
    queryFn: () => fetchSeatInformation(eventDateId),
  });
  return { isLoading, error, data };
};

const NoMoreSeats = ({ cols = 12, currentEvent }) => {
  const { t } = useTranslation();
  const { eventsConfig } = useContext(EventContext);

  const customNoMoreSeatsMessage =
    typeof eventsConfig.customNoMoreSeatsMessage === "function"
      ? eventsConfig.customNoMoreSeatsMessage(currentEvent)
      : null;

  const errorMessage =
    !currentEvent.dateList || !currentEvent.dateList.length
      ? t("This event is no longer available.")
      : t("There are no more seats available for this event!");

  return (
    <div className={`col-${cols} pt-4`}>
      <div className="row alert alert-warning">
        <div className="col-12">{errorMessage}</div>
        {!!customNoMoreSeatsMessage && (
          <div dangerouslySetInnerHTML={{ __html: customNoMoreSeatsMessage }} />
        )}
      </div>
    </div>
  );
};

const noMoreSeatsCondition = (data) =>
  data?.exceededMaxParticipants || data?.availableSeats === 0;

/**
 * Modal used to display forms.
 * @param currentEvent The current event with all properties.
 * @constructor
 */
export function EventForm({ currentEvent }) {
  const { t } = useTranslation();
  const { isLoading, error, data } = useSeatInformation(currentEvent);
  if (isLoading) {
    return <></>;
  }
  if(error) {
    return <div>{t("Could not retrieve event due to an error")}<br />{error}</div>
  }
  if (noMoreSeatsCondition(data)) {
    return <NoMoreSeats cols={12} currentEvent={currentEvent} />;
  }
  return (
    <>
      <h2 id="eventDisplayName">{currentEvent.name}</h2>
      <div className="row-fluid">
        <div className="col-sd-12">
          <CreateForm currentEvent={currentEvent} />
        </div>
      </div>
    </>
  );
}

export const IncludeForm = ({ currentEvent, className = "col-md-6" }) => {
  const { isLoading, error, data } = useSeatInformation(currentEvent);

  if (isLoading) {
    return <></>;
  }
  if (noMoreSeatsCondition(data)) {
    return <NoMoreSeats currentEvent={currentEvent} />;
  }
  return (
    <>
      {!!currentEvent.requiresRegistration && (
        <div className={className}>
          <CreateForm currentEvent={currentEvent} />
        </div>
      )}
    </>
  );
};

const FormModal = makeModal(EventForm);

export default FormModal;
