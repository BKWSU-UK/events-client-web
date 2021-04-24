import React, { useContext } from 'react'
import WebcastButton from './WebcastButton'
import { EVENT_DATE_ID } from './EventDisplay'
import {
    fetchEventDateList,
    fetchSimilarEventList,
} from '../service/dataAccess'
import { topFunction } from '../utils/scrolling'
import EventContext from '../context/EventContext'

/**
 * Displays the event buttons with show more, book only and webcast.
 * @param footerInfo
 * @returns {JSX.Element}
 * @constructor
 */
const EventButtons = ({ footerInfo }) => {
    const {setSimilarEvents} = useContext(EventContext);
    const {
        original, setCurrentEvent,
        setDisplayForm, setEventTableVisible, t
    } = footerInfo;

    const processReadMoreClick = () => {
        if (window.eventsConfig.singleEventUrlTemplate) {
            const eventId = original.id
            window.location.href = window.eventsConfig.singleEventUrlTemplate.replace(
                EVENT_DATE_ID, eventId)
        } else {
            const eventDateId = original.eventDateId
            fetchSimilarEventList(eventDateId, setSimilarEvents)
            processReadMore(footerInfo)
        }
    }

    return (
        <div className="event-buttons">
            <button type="button" className="btn btn-info" onClick={processReadMoreClick}>{t('read-more')} {original.requiresRegistration ? ' ' + t('and-book') : ''}</button>
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
    )
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

function gotoTop() {
    topFunction();
}

export default EventButtons;