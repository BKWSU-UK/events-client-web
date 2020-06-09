import React from 'react';
import {openInNewTab} from "../utils/urlUtils";

/**
 * Displays a button which opens the webcast page.
 * @param original The original event.
 * @param t The translation object.
 * @returns {*}
 * @constructor
 */
export default function WebcastButton({original, t}) {
    if(original.hasWebcast && window.eventsConfig.displayWebcastButton) {
        return (
            <button type="button" className="btn btn-info" onClick={() => openInNewTab(original.webcastUrl)}>
                {t('Open webcast URL')}
            </button>
        )
    } else {
        return (
            <></>
        )
    }
}