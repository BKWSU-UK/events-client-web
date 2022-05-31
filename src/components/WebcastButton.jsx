import React, { useContext } from 'react'
import { openInNewTab } from '../utils/urlUtils'
import { useTranslation } from '../i18n'
import { extractParameter } from '../utils/paramExtraction'
import EventContext from '../context/EventContext'

/** Implements GCH style logic */
const hasWebcast = (original) => {
    return !!original.hasWebcast
        && !!original.webcastUrl
        && !original.requiresRegistration
        && original.webcastUrl.toLowerCase().match(/.+(webcast|watchlive).*/)
}

const chooseWebcastFunction = () => window.eventsConfig.hasWebcastFunc ||
    hasWebcast

/**
 * Displays a button which opens the webcast page.
 * @param original The original event.
 * @param t The translation object.
 * @returns {*}
 * @constructor
 */
export default function WebcastButton ({ original }) {
    const { t } = useTranslation()
    const eventContext = useContext(EventContext)
    if (chooseWebcastFunction()(original) && !!original.webcastUrl &&
        extractParameter({ ...eventContext }, 'displayWebcastButton')) {
        return (
            <button type="button" className="btn btn-info"
                    onClick={() => openInNewTab(original.webcastUrl)}>
                {t('Open webcast URL')}
            </button>
        )
    } else {
        return (
            <></>
        )
    }
}