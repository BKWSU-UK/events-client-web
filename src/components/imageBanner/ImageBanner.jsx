import React from 'react'
import '../../css/imageBanner.css'
import useOrganisationEventsWithContext from "../../hooks/useOrganisationEventsWithContext";
import {extractEventLinkFunction, extractParameter} from "../../utils/paramExtraction";
import LoadingContainer from "../loading/LoadingContainer";

/**
 * Used to display one ore more images with a link to a specific page.
 * @param props
 * @constructor
 */
export default function ImageBanner(props) {
  const {events, data, isLoading, error, eventContext, eventsConfig} = useOrganisationEventsWithContext(props)
  const selectedPositions = extractParameter({...eventContext}, 'imageBanner_selectedPositions') || [0]
  const imagePosition = extractParameter({...eventContext}, 'imageBanner_imagePosition') || '1'
  const eventsCalendarFunction = extractEventLinkFunction(eventsConfig)
  return (
    <div className="container">
      <LoadingContainer data={data} isLoading={isLoading} error={error}>
        <div className="row ems-image-banner">
          {events
            .filter(event => !!event[`image${imagePosition}`])
            .filter((_, i) => !!selectedPositions.includes(i))
            .map((event, i) => {
              return (
                <div key={`${i}_${event.name}`}
                     className={`col-12 ems-image-banner-item`}>
                  <a href={eventsCalendarFunction(event)}>
                    <img className="ems-image-banner-image" src={event[`image${imagePosition}`]} alt={event.name}
                         title={event.name}/>
                  </a>
                </div>
              )
            })}
        </div>
      </LoadingContainer>
    </div>
  )
}