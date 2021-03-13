import React from 'react';
import EventType from "./EventType";
import Venue from "./Venue";
import {fetchEventDateList} from "../service/dataAccess";
import {topFunction} from "../utils/scrolling";
import DateWidget from "./DateWidget";
import {useTranslation} from "../i18n";
import WebcastButton from "./WebcastButton";
import linkifyHtml from 'linkifyjs/html';

const EVENT_DATE_ID = '@@eventDateId@@'

function displayImage1(original) {
    if (original.hasImage1) {
        return (
            <img src={`//events.brahmakumaris.org/bkregistration/imageController.do?eventId=${original.id}&imageNr=1`}
                 alt={original.name} className="rounded float-left mr-3"/>
        )
    }
}

const displaySubTitle = (original) => <h4 className="sub-title">{original.subTitle}</h4>

function displaySimple(original) {
    let description = original.shortDescription || original.descriptionText;
    description = linkifyHtml(description, {
        defaultProtocol: 'https'
    });
    return (
        <>
            {displaySubTitle(original)}
            {displayImage1(original)}
            <EventType eventTypeInt={original.eventTypeId}/>
            <div style={{textAlign: "justify"}} dangerouslySetInnerHTML={{ __html: description }} />
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

function gotoTop() {
    topFunction();
}

const processReadMore = (footerInfo) => {
    const {
        original, setDisplayMoreAbout, setCurrentEvent, setDateList,
        setEventTableVisible, t
    } = footerInfo;
    setDisplayMoreAbout(true);
    setCurrentEvent(original);
    setEventTableVisible(false);
    fetchEventDateList(setDateList, original.id);
    gotoTop();
}

function renderButtons(footerInfo) {
    const {
        original, setCurrentEvent,
        setDisplayForm, setEventTableVisible, t
    } = footerInfo;
    return (
        <div className="row">
            <div className="col-md-6 mt-3 mb-1">
                <button type="button" className="btn btn-info" onClick={() => {
                    if(window.eventsConfig.singleEventUrlTemplate) {
                        window.location.href = window.eventsConfig.singleEventUrlTemplate.replace(EVENT_DATE_ID, original.id)
                    } else {
                        processReadMore(footerInfo)
                    }
                }}>{t('read-more')} {original.requiresRegistration ? ' ' + t('and-book') : ''}</button>
                {' '}
                {original.requiresRegistration && !window.eventsConfig.suppressBookOnly ? (
                    <button type="button" className="btn btn-info" onClick={() => {
                        setCurrentEvent(original);
                        setDisplayForm(true);
                        setEventTableVisible(false);
                        gotoTop();
                    }}>{t('book-only')}
                    </button>) : ''}
                {' '}
                <WebcastButton original={original} />
            </div>
        </div>
    )
}

function displayFooterSimple(footerInfo) {
    const {original} = footerInfo;
    return (
        <>
            <Venue venue={original.venue}
                   venueName={original.venue.name}
                   venueAddress={original.venue.address}
                   venuePostalCode={original.venue.postalCode}
                   venueLocality={original.venue.locality}/>
            {renderButtons(footerInfo)}
        </>
    );
}

function displayFooterFull(original, props) {
    if (props.history) {
        return (
            <>
                <Venue venue={original} venueName={original.venueName}
                       venueAddress={original.venueAddress} venuePostalCode={original.venuePostCode}
                       venueLocality={original.venueCity}/>
                <button className="btn btn-secondary" onClick={props.history.goBack}>Back</button>
            </>
        );
    }
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
    return (
        <>
            <EventDisplayBody original={original} simple={simple} />
            {displayFooterSimple({
                original, setDisplayMoreAbout,
                setCurrentEvent, setDateList, setDisplayForm, setEventTableVisible, t
            })}
        </>
    );
}

export const EventDisplayBody = ({ original, simple }) => {
    const startDate = '' + original.startTimestamp;
    const endDate = '' + original.endTimestamp;
    const {t} = useTranslation();
    return (
        <div className="row">
            <div className="col-sm-12">
                <h3 title={t(eventMap[original.eventTypeId])}>{original.name}</h3>
                <div className="pull-right">
                    <DateWidget startDate={startDate} endDate={endDate} timezone={original.timezone}/>
                </div>
                {simple ? displaySimple(original) : displayFull(original)}
            </div>
        </div>
    )
}

export default EventDisplay;