import React, { useContext } from 'react'
import EventType from './EventType'
import Venue from './Venue'
import DateWidget from './DateWidget'
import { useTranslation } from '../i18n'
import linkifyHtml from 'linkifyjs/html'
import EventButtons, { processReadMoreClick } from './EventButtons'
import EventContext from '../context/EventContext'

export const EVENT_DATE_ID = '@@eventDateId@@'

function displayImage1(original) {
    if (original.hasImage1) {
        return (
            <img src={`//events.brahmakumaris.org/bkregistration/imageController.do?eventId=${original.id}&imageNr=1`}
                 alt={original.name} className="rounded float-left mr-3"/>
        )
    }
}

const displaySubTitle = (original) => <h4 className="sub-title">{original.subTitle}</h4>

function displaySimple(original, footerInfo) {
    const showCalendar = window.eventsConfig.showCalendar
    let description
    if(showCalendar) {
        description = original.description
    } else {
        description = original.shortDescription || original.descriptionText || original.description;
    }
    description = linkifyHtml(description, {
        defaultProtocol: 'https'
    });
    const showVenue = !window.eventsConfig.suppressVenue && showCalendar
    console.log('showVenue', showVenue)
    return (
        <>
            {displaySubTitle(original)}
            {!showCalendar && displayImage1(original)}
            <EventType eventTypeInt={original.eventTypeId}/>
            <div style={{textAlign: "justify"}} dangerouslySetInnerHTML={{ __html: description }} />
            {showVenue && (
                <>
                    <Venue venue={original.venue}
                           venueName={original.venue.name}
                           venueAddress={original.venue.address}
                           venuePostalCode={original.venue.postalCode}
                           venueLocality={original.venue.locality}/>
                </>
             )}
        </>
    )
}

function displayFull(original) {
    return (
        <>
            {displaySubTitle(original)}
            <p className="lead">{original.eventTypeName}</p>
            <span dangerouslySetInnerHTML={{__html: original.description}}/>
        </>
    );
}

function renderButtons(footerInfo) {
    return (
        <div className="row">
            <div className="col-md-6 mt-3 mb-1">
                <EventButtons footerInfo={footerInfo} />
            </div>
        </div>
    )
}

function displayFooterSimple(footerInfo) {
    const {original} = footerInfo;
    return (
        !window.eventsConfig.suppressVenue && !!original.venue && <>
            <Venue venue={original.venue}
                   venueName={original.venue.name}
                   venueAddress={original.venue.address}
                   venuePostalCode={original.venue.postalCode}
                   venueLocality={original.venue.locality}/>
            {renderButtons(footerInfo)}
        </>
    );
}

export const eventMap = {
    1: "Lecture",
    2: "Seminar",
    3: "Course",
    4: "Conference",
    5: "Retreat",
    6: "Workshop",
    7: "Panel discussion",
    8: "Special event",
    9: "Meditation",
    10: "Miscellaneous",
    11: "Training",
    12: "Power and protection",
    13: "Private",
    14: "Group session",
    15: "Online activity",
    16: "BK Event"
};

function EventDisplay({
                          original, simple = true,
                          setDisplayMoreAbout, setCurrentEvent, setDateList, setDisplayForm,
                          setEventTableVisible
                      }) {
    const {t} = useTranslation();
    const footerInfo = {
        original, setDisplayMoreAbout,
        setCurrentEvent, setDateList, setDisplayForm, setEventTableVisible, t
    }
    return (
        <>
            <EventDisplayBody original={original} simple={simple} footerInfo={footerInfo}/>
            {displayFooterSimple(footerInfo)}
        </>
    );
}

export const EventDisplayBody = ({ original, simple, footerInfo}) => {
    const { setSimilarEvents } = useContext(EventContext)
    const startDate = '' + original.startTimestamp;
    const endDate = '' + original.endTimestamp;
    const {t} = useTranslation();
    return (
        <div className="row">
            <div className="col-sm-12">
                <h3 title={t(eventMap[original.eventTypeId])}><a href="#" onClick={async e => {
                    e.preventDefault()
                    await processReadMoreClick(footerInfo, setSimilarEvents);
                }}>{original.name}</a></h3>
                <div className="pull-right">
                    <DateWidget startDate={startDate} endDate={endDate} timezone={original.timezone}/>
                </div>
                {simple ? displaySimple(original, { t, ...footerInfo }) : displayFull(original)}
            </div>
        </div>
    )
}

export default EventDisplay;