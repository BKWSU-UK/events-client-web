import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import DetailRenderer from './DetailRenderer'
import { IncludeForm } from './forms/FormModal'
import EventContext from '../context/EventContext'
import { RenderDate, venueFactory } from './readMore/ReadMore'
import useTimeFormat from '../hooks/useTimeFormat'
import useLanguage from '../hooks/useLanguage'
import { extractParameter } from '../utils/paramExtraction'

function EventDisplay ({ currentEvent }) {
  const timeFormat = useTimeFormat()

  const hideEventDate = extractParameter(null,
    'hideEventDate', false)
  const showShortDescription = extractParameter(null,
    'showShortDescription', false)

  useLanguage()
  if (!!currentEvent) {
    const date = currentEvent.dateList && currentEvent.dateList.length > 0
      ? currentEvent.dateList[0] : null
    if (!!date) {
      return (
        <>
          <h2>{currentEvent.name}</h2>
          {!!currentEvent.subTitle && <h3>{currentEvent.subTitle}</h3>}
          {showShortDescription && <div className="row mb-3 mt-3">
            <div className="col-12">
              {currentEvent.shortDescription}
            </div>
          </div>}
          {!hideEventDate && <div className="row mb-3 mt-3">
            <div className="col-12">
              <RenderDate date={date}
                          currentEvent={venueFactory(
                            currentEvent)}
                          timeFormat={timeFormat}/>
            </div>
          </div>}
        </>
      )
    }
  }
  return <></>
}

/**
 * Displays an event using the event identifier.
 * @param props Contains router related properties we might want to keep.
 * @returns {JSX.Element}
 * @constructor
 */
function EventForm (props) {

  const { currentEvent } = useContext(EventContext)

  return (
    <DetailRenderer origProps={{ ...props }}>
      <EventDisplay currentEvent={currentEvent}/>
      <IncludeForm currentEvent={currentEvent}
                   className="col-12 pl-1 pr-1"/>
    </DetailRenderer>
  )
}

export default withRouter(EventForm)