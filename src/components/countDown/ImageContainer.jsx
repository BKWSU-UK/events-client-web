import React, { useContext, useEffect } from 'react'
import EventContext from '../../context/EventContext'
import { correctImagePath, extractRandomImage } from '../../utils/imgUtils'
import {
    EVENT_COUNTDOWN_ACTIONS,
    EventCountdownContext,
} from '../../context/EventCountdownContext'

const imageFactory = (data, eventsConfig) => {
    const image1 = data.length > 0 ? data[0].image1 : null
    if(!!image1) {
        return correctImagePath(image1)
    }
    return extractRandomImage(eventsConfig)
}

/**
 * The image container
 * @constructor
 */
const ImageContainer = (props) => {

    const { eventsConfig } = useContext(EventContext)
    const { data } = props

    const image = imageFactory(data, eventsConfig)

    return (
        <div className="container event-count-container" style={{background: `url(${image}) center center / cover no-repeat`}}>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default ImageContainer