import React, { useContext } from 'react'
import CompositeCalendarContext, {
  CARD_TYPEUI_VIEW,
} from '../../context/CompositeCalendarContext'
import { formatHeaderDates } from '../../utils/dateUtils'
import COMPOSITE_CALENDAR_CONFIG from './compositeCalendarConfig'

/**
 * Displays the single date title.
 * @constructor
 */
const SingleDateTitle = () => {
  const compositeCalendarContext = useContext(CompositeCalendarContext)
  const { stateCalendar } = compositeCalendarContext

  return (
    <div className="row">
      {(stateCalendar.eventCount > 0 || stateCalendar.cardType === CARD_TYPEUI_VIEW.DAY )&& <div className="col-12">
        <h3 className="mt-5">{formatHeaderDates(
          stateCalendar.selectedSingleDate,
          COMPOSITE_CALENDAR_CONFIG.HEADER_DATE_FORMAT)}</h3>
      </div>}
    </div>
  )
}

export default SingleDateTitle