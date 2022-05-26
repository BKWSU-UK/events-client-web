import React, { useContext } from 'react'
import EventType from './EventType'
import Venue from './Venue'
import DateWidget from './DateWidget'
import { useTranslation } from '../i18n'
import linkifyHtml from 'linkifyjs/html'
import EventButtons, { processReadMoreClick } from './EventButtons'
import EventContext from '../context/EventContext'
import { extractParameter } from '../utils/paramExtraction'
import { removeBadStylesFromImg } from '../utils/imgUtils'

export const EVENT_DATE_ID = '@@eventDateId@@'

function Image1 ({ original, footerInfo }) {

    const eventContext = useContext(EventContext)
    const { setSimilarEvents } = eventContext

    if (original.hasImage1) {
        return (
            <a href="#" onClick={async e => {
                {
                    e.preventDefault()
                    await processReadMoreClick(footerInfo, setSimilarEvents,
                        eventContext)
                }
            }}>
                <img
                    src={`//events.brahmakumaris.org/bkregistration/imageController.do?eventId=${original.id}&imageNr=1`}
                    alt={original.name}
                    className="rounded float-left mr-3 emsMainImage"/>
            </a>
        )
    }
    return <></>
}

const displaySubTitle = (original) => <h4
    className="sub-title">{original.subTitle}</h4>

function DisplaySimple ({ original, footerInfo }) {
    const eventContext = useContext(EventContext)
    const showCalendar = extractParameter({ ...eventContext }, 'showCalendar')
    let description
    if (showCalendar) {
        description = original.description
    } else {
        description = original.shortDescription || original.descriptionText ||
            original.description
    }
    description = removeBadStylesFromImg(description)
    description = linkifyHtml(description, {
        defaultProtocol: 'https',
    })
    const showVenue = !extractParameter({ ...eventContext }, 'suppressVenue') &&
        showCalendar
    return (
        <>
            {displaySubTitle(original)}
            {!showCalendar && <Image1 original={original} footerInfo={footerInfo} />}
            <EventType eventTypeInt={original.eventTypeId}/>
            <div style={{ textAlign: 'justify' }}
                 dangerouslySetInnerHTML={{ __html: description }}/>
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

const DisplayFull = ({ original }) => {
    const description = removeBadStylesFromImg(original.description)
    return (
        <>
            {displaySubTitle(original)}
            <p className="lead">{original.eventTypeName}</p>
            <span dangerouslySetInnerHTML={{ __html: description }}/>
        </>
    )
}

function renderButtons (footerInfo) {
    return (
        <div className="row">
            <div className="col-md-6 mt-3 mb-1">
                <EventButtons footerInfo={footerInfo}/>
            </div>
        </div>
    )
}

function displayFooterSimple (footerInfo, eventContext) {
    const { original } = footerInfo
    return (
        <>
            {!extractParameter({ ...eventContext }, 'suppressVenue') &&
            !!original.venue &&
            <Venue venue={original.venue}
                   venueName={original.venue.name}
                   venueAddress={original.venue.address}
                   venuePostalCode={original.venue.postalCode}
                   venueLocality={original.venue.locality}/>}
            {renderButtons(footerInfo)}
        </>
    )
}

export const eventMap = {
    1: 'Lecture',
    2: 'Seminar',
    3: 'Course',
    4: 'Conference',
    5: 'Retreat',
    6: 'Workshop',
    7: 'Panel discussion',
    8: 'Special event',
    9: 'Meditation',
    10: 'Miscellaneous',
    11: 'Training',
    12: 'Power and protection',
    13: 'Private',
    14: 'Group session',
    15: 'Online activity',
    16: 'BK Event',
}

function EventDisplay ({
    original, simple = true,
    setDisplayMoreAbout, setCurrentEvent, setDateList, setDisplayForm,
    setEventTableVisible,
}) {
    const { t } = useTranslation()
    const eventContext = useContext(EventContext)
    const footerInfo = {
        original, setDisplayMoreAbout,
        setCurrentEvent, setDateList, setDisplayForm, setEventTableVisible, t,
    }
    return (
        <>
            <EventDisplayBody original={original} simple={simple}
                              footerInfo={footerInfo}/>
            {displayFooterSimple(footerInfo, eventContext)}
        </>
    )
}

export const EventDisplayBody = ({ original, simple, footerInfo }) => {
    const eventContext = useContext(EventContext)
    const { setSimilarEvents } = eventContext
    const startDate = '' + original.startTimestamp
    const endDate = '' + original.endTimestamp
    const { t } = useTranslation()
    return (
        <div className="row">
            <div className="col-sm-12">
                <h3 title={t(eventMap[original.eventTypeId])}><a href="#"
                                                                 onClick={async e => {
                                                                     e.preventDefault()
                                                                     await processReadMoreClick(
                                                                         footerInfo,
                                                                         setSimilarEvents,
                                                                         eventContext)
                                                                 }}>{original.name}</a>
                </h3>
                <div className="pull-right">
                    <DateWidget startDate={startDate} endDate={endDate}
                                timezone={original.timezone}/>
                </div>
                {simple ? <DisplaySimple original={original} footerInfo={footerInfo} /> : <DisplayFull original={original}/>}
            </div>
        </div>
    )
}

export default EventDisplay