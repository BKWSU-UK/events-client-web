import React, { useContext } from 'react'
import { EventCountdownContext } from '../../context/EventCountdownContext'
import { processDefaultEmptyArray } from '../../utils/validationUtils'
import { DescriptionDisplay } from '../compositeCalendar/EventDateModal'
import SpeakerDescription from '../singleEventSession/SpeakerDescription'

/**
 * Contains the event description.
 * @constructor
 */
const EventDescriptionSpeaker = () => {
    const { stateCountdownData } = useContext(EventCountdownContext)
    const { data } = stateCountdownData

    return processDefaultEmptyArray(data, (data) => {
        const ev = data[0]

        return (
            <div className="container countdown-description-speaker">
                <DescriptionDisplay event={ev}
                                    className="calendar-detail-description"/>
                <SpeakerDescription ev={ev} />
            </div>
        )
    })
}

export default EventDescriptionSpeaker