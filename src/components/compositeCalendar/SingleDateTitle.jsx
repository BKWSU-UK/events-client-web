import React, { useContext } from 'react'
import CompositeCalendarContext from '../../context/CompositeCalendarContext'
import { formatHeaderDates } from '../../utils/dateUtils'

/**
 * Displays the single date title.
 * @constructor
 */
const SingleDateTitle = () => {
    const compositeCalendarContext = useContext(CompositeCalendarContext)
    const { stateDate } = compositeCalendarContext

    return (
        <div className="row">
            <div className="col-6">
                <h3 className="mt-5">{formatHeaderDates(stateDate.selectedSingleDate)}</h3>
            </div>
        </div>
    )
}

export default SingleDateTitle