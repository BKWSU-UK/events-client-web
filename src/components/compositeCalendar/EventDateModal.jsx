import React, { useContext } from 'react'
import CompositeCalendarContext, { DATE_ACTIONS } from '../../context/CompositeCalendarContext'
import { useQuery } from 'react-query'
import { fetchEventDateWithSeats } from '../../service/dataAccess'
import { eventMap } from '../EventDisplay'
import { useTranslation } from '../../i18n'
import { RenderDate } from '../readMore/ReadMore'
import useTimeFormat from '../../hooks/useTimeFormat'
import {
    extractImageFromEvent,
    removeBadStylesFromImg,
} from '../../utils/imgUtils'
import LoadingContainer from '../loading/LoadingContainer'
import CreateForm from '../forms/CreateForm'
import Venue from '../Venue'
import { GOOGLE_MAPS_API_KEY } from '../../context/appParams'
import { extractParameter } from '../../utils/paramExtraction'

const ImageDisplay = ({ event }) => {
    const image = extractImageFromEvent(event)
    return (
        !!image && <img src={image} className="img-fluid event-image"
                        alt={event?.name}/> || <></>
    )
}

const WebcastUrlDisplay = ({ event }) => {
    return (
        !!event?.hasWebcast && event.webcastUrl.startsWith('http') &&
        <div className="alert alert-primary mt-3 calendar-webcast" role="alert">
            <a href={event.webcastUrl}>{event.webcastUrl}</a>
        </div>
        || <></>
    )
}

const DescriptionDisplay = ({ event }) => {
    if (event?.shortDescription) {
        return (
            <p>{event?.shortDescription}</p>
        )
    }
    return (
        <div className="row mt-2">
            <div className="col-12">
                <div dangerouslySetInnerHTML={{
                    __html: removeBadStylesFromImg(event?.description),
                }}/>
            </div>
        </div>
    )
}

const SubTitleAndTypeDisplay = ({ event }) => {
    const { t } = useTranslation()
    return (
        <div className="row">
            <div className="col-12">
                {!!event?.subTitle && <h5>{event?.subTitle}</h5>}
                <h6>{t(eventMap[event?.eventType])}</h6>
            </div>
        </div>
    )
}

const FormDisplay = ({ event }) => {
    return (
        <div className="row mt-2">
            <div className="col-12">
                {!!event &&
                event.requiresRegistration &&
                event.availableSeats > 0 &&
                <CreateForm currentEvent={event}/>}
            </div>
        </div>
    )
}

const venueAdapter = (event) => {
    const venue = {
        ...event.simpleVenue,
        country: event.simpleVenue.countryName,
    }
    return {
        venue,
        venueName: event.simpleVenue.name,
        venueAddress: event.simpleVenue.address,
        venuePostalCode: event.simpleVenue.postalCode,
        venueLocality: event.simpleVenue.locality,
    }
}

const VenueDisplay = ({ event }) => {
    const { venue, venueName, venueAddress, venuePostalCode, venueLocality } =
        venueAdapter(event)
    return (
        <div className="row mt-2">
            <div className="col-12">
                <Venue venue={venue} venueName={venueName}
                       venueAddress={venueAddress}
                       venuePostalCode={venuePostalCode}
                       venueLocality={venueLocality}/>
            </div>
        </div>
    )
}

const GoogleMapsDisplay = ({ event }) => {
    const latitude = event?.simpleVenue.latitude
    const longitude = event?.simpleVenue.longitude
    if (event.onlineOnly || !latitude || !longitude || latitude === "0.0"|| longitude === "0.0") {
        return <></>
    }

    const language = extractParameter(null, 'language', 'en-US')
    const src = `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_MAPS_API_KEY}&center=${latitude},${longitude}&zoom=18&language=${language}`

    return (
        <div className="row mt-2">
            <div className="col-12">
                <iframe
                    width="100%"
                    height="300"
                    frameBorder="0" style={{border: 0}}
                    referrerPolicy="no-referrer-when-downgrade"
                    src={src}
                    allowFullScreen>
                </iframe>
            </div>
        </div>
    )
}

const eventDateAdapter = (eventDate) => {
    if (!eventDate) {
        return null
    }
    return {
        ...eventDate,
        startIso: `${eventDate.startDate}T${eventDate.startTime}`,
        endIso: `${eventDate.endDate}T${eventDate.endTime}`,
    }
}

/**
 * Used to display the details about a single date.
 * @constructor
 */
const EventDateModal = () => {

    const { t } = useTranslation()
    const timeFormat = useTimeFormat()
    const compositeCalendarContext = useContext(CompositeCalendarContext)
    const { stateDate, dispatchDate } = compositeCalendarContext

    const { isLoading, error, data } = useQuery([stateDate.modalEventDateId],
        () => fetchEventDateWithSeats(stateDate.modalEventDateId))

    const showModal = !!stateDate.modalEventDateId

    const hide = () => {
        dispatchDate({ type: DATE_ACTIONS.HIDE_MODAL_EVENT_DATE })
    }

    const adaptedEventDate = eventDateAdapter(data)

    return (
        stateDate.modalEventDateId &&
        <div className={`modal fade ${showModal && 'show'}`} tabIndex="-1"
             style={{ display: showModal ? 'block' : 'none' }}>

            <div className="modal-dialog">
                <div className="modal-content">
                    <LoadingContainer data={adaptedEventDate}
                                      isLoading={isLoading}
                                      error={error}>
                        <div className="modal-header">
                            <h4 className="modal-title"
                                id={data?.id}>{data?.name}</h4>
                            <button type="button" className="close"
                                    data-dismiss="modal" aria-label="Close"
                                    onClick={hide}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <SubTitleAndTypeDisplay
                                event={adaptedEventDate}/>

                            <div className="row">
                                <div className="col-12">
                                    {!!adaptedEventDate &&
                                    <RenderDate date={adaptedEventDate}
                                                currentEvent={adaptedEventDate}
                                                timeFormat={timeFormat}
                                                useIcon={true}/>}
                                </div>
                            </div>

                            <DescriptionDisplay event={adaptedEventDate}/>
                            {!!adaptedEventDate &&
                            <ImageDisplay event={adaptedEventDate}/>}
                            <WebcastUrlDisplay event={adaptedEventDate}/>
                            <VenueDisplay event={adaptedEventDate}/>
                            <FormDisplay event={adaptedEventDate}/>
                            <GoogleMapsDisplay event={adaptedEventDate}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-dismiss="modal"
                                    onClick={hide}>{t('Close')}</button>
                        </div>
                    </LoadingContainer>
                </div>
            </div>
        </div>
    )
}

export default EventDateModal