
import React, { useContext } from 'react'
import EventContext from '../../context/EventContext'
import { DescriptionDisplay } from '../compositeCalendar/EventDateModal'
import { useTranslation } from '../../i18n'
import { eventDateAdapter } from '../../utils/dateUtils'
import moment from 'moment-timezone'
import EventInfoDate from './eventInfoSection/EventInfoDate'
import EventInfoTime from './eventInfoSection/EventInfoTime'
import EventInfoType from './eventInfoSection/EVentInfoType'
import EventInfoSocialMedia from './eventInfoSection/EventInfoSocialMedia'
import GoogleCalendarImportButton from './GoogleCalendrImportButton'

/**
 * Event Information main block.
 * @param ev
 * @constructor
 */
const EventInfoMain = ({ ev }) => {

    const { eventsConfig } = useContext(EventContext)

    const shivImage = eventsConfig.shivaStarImage || '/assets/images/shiva.png'

    return (
        <div className="row">
            <div className="col-12 col-sm-6 calendar-detail-title">
                <h4 className="mt-3">{ev.name}</h4>
                <div className="calendar-flex-centre mt-3">
                    <img src={shivImage} className="calendar-shiva" alt={ev.name}/>
                    {ev.organisations[0].name}
                </div>
                <DescriptionDisplay event={ev} className="calendar-detail-description" />
            </div>
            <div className="col-12 col-sm-6">
                <div className="card ml-3 mr-3 mt-3 mb-3">
                    <ul className="list-group list-group-flush">
                        <EventInfoDate ev={ev} />
                        <EventInfoTime ev={ev} />
                        <EventInfoType ev={ev} />
                        <EventInfoSocialMedia ev={ev} />
                    </ul>
                </div>
                <div className="row">
                    <GoogleCalendarImportButton ev={ev}/>
                </div>
            </div>
        </div>
    )
}

export default EventInfoMain