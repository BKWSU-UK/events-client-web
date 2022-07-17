import React from 'react'
import { useTranslation } from '../../i18n'
import { eventDateAdapter } from '../../utils/dateUtils'
import { googleCalendarLink } from '../../utils/googleCalendarUtils'
import extractText from '../../utils/textExtraction'

/**
 * Used to import into the Google calendar.
 * @constructor
 */
const GoogleCalendarImportButton = ({ev}) => {

    const { t } = useTranslation()
    const adaptedEventDate = eventDateAdapter(ev)
    ev.descriptionText = ev.shortDescription || extractText(ev.description)
    console.log('ev.webcastUrl.matches')
    if(ev.hasWebcast && ev.webcastUrl.match(/https:\/\/.+/)) {
        ev.descriptionText = ev.webcastUrl + "\r\n" + ev.descriptionText
    }
    ev.venue = ev.simpleVenue
    const calendarLink = googleCalendarLink(ev, adaptedEventDate)

    return (
        <div className="col-12 calendar-detail-buttons">
            <a href={calendarLink} target="_blank">{t('Import on Google Calendar')}</a>
        </div>
    )
}

export default GoogleCalendarImportButton