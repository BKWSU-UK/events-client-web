import React from 'react'
import WebcastButton from './WebcastButton'
import { EVENT_DATE_ID } from './EventDisplay'
import { fetchEventDateList } from '../service/dataAccess'
import { topFunction } from '../utils/scrolling'

/**
 * Displays the event buttons with show more, book only and webcast.
 * @param footerInfo
 * @returns {JSX.Element}
 * @constructor
 */
const EventButtons = ({ footerInfo }) => {
    const {
        original, setCurrentEvent,
        setDisplayForm, setEventTableVisible, t
    } = footerInfo;

    return (
        <div className="event-buttons">
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