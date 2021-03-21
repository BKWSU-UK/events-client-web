import React from 'react'
import WebcastButton from './WebcastButton'
import { EVENT_DATE_ID } from './EventDisplay'

/**
 * Displays the event buttons with show more, book only and webcast.
 * @param footerInfo
 * @returns {JSX.Element}
 * @constructor
 */
const EventButtons = (footerInfo) => {
    const {
        original, setCurrentEvent,
        setDisplayForm, setEventTableVisible, t
    } = footerInfo;
    return (
        <>
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
        </>
    )
}

export default EventButtons;