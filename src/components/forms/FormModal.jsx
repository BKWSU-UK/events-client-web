import React, { useContext } from "react";
import makeModal from "../simpleModal/makeModal";
import { useTranslation } from "../../i18n";

import { fetchSeatInformation } from "../../service/dataAccess";
import CreateForm from "./CreateForm";
import EventContext from "../../context/EventContext";
import { useQuery } from "@tanstack/react-query";

export const useSeatInformation = (currentEvent) => {
  const eventDateId = currentEvent.eventDateId
    ? currentEvent.eventDateId
    : currentEvent.dateList[0].eventDateId;
  const { isLoading, error, data } = useQuery({
    queryKey: [eventDateId],
    queryFn: () => fetchSeatInformation(eventDateId),
  });
  return { isLoading, error, data };
};

const NoMoreSeats = ({ cols = 6, currentEvent }) => {
  const { t } = useTranslation();
  const { eventsConfig } = useContext(EventContext);

  const customNoMoreSeatsMessage =
    typeof eventsConfig.customNoMoreSeatsMessage === "function"
      ? eventsConfig.customNoMoreSeatsMessage(currentEvent)
      : null;

  return (
    <div className={`col-${cols}`}>
      <div className="row alert alert-warning">
        <div className="col-12">
          {t("There are no more seats available for this event!")}
        </div>
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
 * @param show Determines, if the form is displayed or not.
 * @param setShow The function invoked when the modal is closed.
 * @param currentEvent The current event with all properties.
 * @constructor
 */
export function EventForm({ show, setShow, currentEvent }) {
  const { isLoading, error, data } = useSeatInformation(currentEvent);
  if (isLoading) {
    return <></>;
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
