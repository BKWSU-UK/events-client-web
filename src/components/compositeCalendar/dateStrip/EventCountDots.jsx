import React from 'react'
import { useTranslation } from '../../../i18n'

const EVENT_LIMIT = 5

/**
 * Display the number of events on a day.
 * @param eventCount
 * @returns {JSX.Element}
 * @constructor
 */
const EventCountDots = ({ eventCount = 0 }) => {

    const { t } = useTranslation()

    if(eventCount < EVENT_LIMIT) {
        return (
            <>
                {Array(eventCount).fill(1).map((_, index) => {
                    return (
                        <button className="event-count"
                                key={index}>{' '}</button>
                    )
                })}
            </>
        )
    } else {
        return (
            <div>{eventCount} {t('events')}</div>
        )
    }
}

export default EventCountDots