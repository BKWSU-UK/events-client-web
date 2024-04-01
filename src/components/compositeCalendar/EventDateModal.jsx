import React, { useContext, useEffect, useRef, useState } from "react";
import CompositeCalendarContext, {
  DATE_ACTIONS,
} from "../../context/CompositeCalendarContext";
import { fetchEventDateWithSeats } from "../../service/dataAccess";
import { useTranslation } from "../../i18n";
import { RenderDate } from "../readMore/ReadMore";
import useTimeFormat from "../../hooks/useTimeFormat";
import { extractImageFromEvent } from "../../utils/imgUtils";
import LoadingContainer from "../loading/LoadingContainer";
import CreateForm from "../forms/CreateForm";
import Venue from "../Venue";
import { GOOGLE_MAPS_API_KEY } from "../../context/appParams";
import { extractParameter } from "../../utils/paramExtraction";
import { eventMap } from "../../service/dataAccessConstants";
import { eventDateAdapter } from "../../utils/dateUtils";
import { missesCoordinates } from "../../utils/googleCalendarUtils";
import extractText from "../../utils/textExtraction";
import linkifyHtml from "linkifyjs/html";
import { Wrapper } from "@googlemaps/react-wrapper";
import { chooseOnlineClass } from "./card/EventDateCard";
import { useQuery } from "@tanstack/react-query";

const ImageDisplay = ({ event }) => {
  const image = extractImageFromEvent(event);
  return (
    (!!image && (
      <img src={image} className="img-fluid event-image" alt={event?.name} />
    )) || <></>
  );
};

const WebcastUrlDisplay = ({ event }) => {
  return (
    (!!event?.hasWebcast && event.webcastUrl.startsWith("http") && (
      <div className="alert alert-primary mt-3 calendar-webcast" role="alert">
        <a href={event.webcastUrl}>{event.webcastUrl}</a>
      </div>
    )) || <></>
  );
};

export const DescriptionDisplay = ({ event, className = "" }) => {
  return (
    <div className={`row mt-2 ${className}`}>
      <div className="col-12">
        {(!!event?.shortDescription && (
          <p className="preline-text">{event?.shortDescription}</p>
        )) || (
          <div
            className="preline-text"
            dangerouslySetInnerHTML={{
              __html: linkifyHtml(extractText(event?.description)),
            }}
          />
        )}
      </div>
    </div>
  );
};

const SubTitleAndTypeDisplay = ({ event }) => {
  const { t } = useTranslation();
  return (
    <div className="row">
      <div className="col-12">
        {!!event?.subTitle && <h5>{event?.subTitle}</h5>}
        <h6>{t(eventMap[event?.eventType])}</h6>
      </div>
    </div>
  );
};

const FormDisplay = ({ event }) => {
  return (
    <div className="row mt-2">
      <div className="col-12">
        {!!event && event.requiresRegistration && event.availableSeats > 0 && (
          <CreateForm currentEvent={event} />
        )}
      </div>
    </div>
  );
};

const venueAdapter = (event) => {
  const venue = {
    ...event.simpleVenue,
    country: event.simpleVenue?.countryName,
  };
  return {
    venue,
    venueName: event.simpleVenue?.name,
    venueAddress: event.simpleVenue?.address,
    venuePostalCode: event.simpleVenue?.postalCode,
    venueLocality: event.simpleVenue?.locality,
  };
};

export const VenueDisplay = ({ event }) => {
  const { venue, venueName, venueAddress, venuePostalCode, venueLocality } =
    venueAdapter(event);
  return (
    <div className="row mt-2">
      <div className="col-12">
        <Venue
          venue={venue}
          venueName={venueName}
          venueAddress={venueAddress}
          venuePostalCode={venuePostalCode}
          venueLocality={venueLocality}
        />
      </div>
    </div>
  );
};

function MyMapComponent({ center, zoom, children }) {
  const ref = useRef();

  const [map, setMap] = useState();

  useEffect(() => {
    setMap(
      new window.google.maps.Map(ref.current, {
        center,
        zoom,
      }),
    );
    // remove map on unmount
    return () => {
      if (map) {
        setMap(null);
      }
    };
  }, [center]);

  return (
    <>
      <div ref={ref} className="googleMap" />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
}

const Marker = (options) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (!!marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);
  React.useEffect(() => {
    if (!!marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);
  return null;
};

export const GoogleMapsDisplay = ({ event, useWrapper = true }) => {
  const latitude = event?.simpleVenue.latitude;
  const longitude = event?.simpleVenue.longitude;

  const language = extractParameter(null, "language", "en-US");

  const center = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
  const zoom = 19;

  if (missesCoordinates(event)) {
    return <></>;
  }

  return (
    <Wrapper apiKey={GOOGLE_MAPS_API_KEY}>
      <MyMapComponent center={center} zoom={zoom}>
        <Marker position={center} />
      </MyMapComponent>
    </Wrapper>
  );
};

/**
 * Used to display the details about a single date.
 * @constructor
 */
const EventDateModal = () => {
  const { t } = useTranslation();
  const timeFormat = useTimeFormat();
  const compositeCalendarContext = useContext(CompositeCalendarContext);
  const { stateCalendar, dispatchDate } = compositeCalendarContext;

  const { isLoading, error, data } = useQuery({
    queryKey: [stateCalendar.modalEventDateId],
    queryFn: () => fetchEventDateWithSeats(stateCalendar.modalEventDateId),
  });

  const showModal = !!stateCalendar.modalEventDateId;

  const hide = () => {
    dispatchDate({ type: DATE_ACTIONS.HIDE_MODAL_EVENT_DATE });
  };

  const adaptedEventDate = eventDateAdapter(data);

  return (
    (stateCalendar.modalEventDateId && (
      <div
        className={`modal fade ${showModal && "show"}`}
        tabIndex="-1"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <LoadingContainer
              data={adaptedEventDate}
              isLoading={isLoading}
              error={error}
            >
              <div className="modal-header">
                <h4 className="modal-title" id={data?.id}>
                  {data?.name}
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {adaptedEventDate && (
                <div
                  className={`${chooseOnlineClass(
                    adaptedEventDate,
                  )} modal-body`}
                >
                  <SubTitleAndTypeDisplay event={adaptedEventDate} />

                  <div className="row">
                    <div className="col-12">
                      {!!adaptedEventDate && (
                        <RenderDate
                          date={adaptedEventDate}
                          currentEvent={adaptedEventDate}
                          timeFormat={timeFormat}
                          useIcon={true}
                        />
                      )}
                    </div>
                  </div>

                  <DescriptionDisplay event={adaptedEventDate} />
                  {!!adaptedEventDate && (
                    <ImageDisplay event={adaptedEventDate} />
                  )}
                  <WebcastUrlDisplay event={adaptedEventDate} />
                  <VenueDisplay event={adaptedEventDate} />
                  <FormDisplay event={adaptedEventDate} />
                  <GoogleMapsDisplay event={adaptedEventDate} />
                </div>
              )}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={hide}
                >
                  {t("Close")}
                </button>
              </div>
            </LoadingContainer>
          </div>
        </div>
      </div>
    )) || <></>
  );
};

export default EventDateModal;
