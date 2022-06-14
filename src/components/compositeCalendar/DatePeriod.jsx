import React, { useContext } from 'react'
import CompositeCalendarContext from '../../context/CompositeCalendarContext'
import { formatHeaderDates } from '../../utils/dateUtils'

/**
 * Displays a date period.
 * @constructor
 */
const DatePeriod = () => {
    const compositeCalendarContext = useContext(CompositeCalendarContext)
    const { stateDate } = compositeCalendarContext

    return (
        <div className="row" style={{clear: 'both'}}>
            <div className="col-6">
                <h3 className="mt-5">{formatHeaderDates(stateDate.visibleDateStart)}</h3>
            </div>
            <div className="col-6 text-right">
                <h3 className="mt-5">{formatHeaderDates(stateDate.visibleDateEnd)}</h3>
            </div>
        </div>
    )
}

export default DatePeriod