import React, { useContext, useRef, useState } from 'react'
import EventContext, { extractEventListParameters } from '../../context/EventContext'
import { useQuery } from 'react-query'
import { getEventList } from '../../service/dataAccess'
import LoadingContainer from '../loading/LoadingContainer'
import { Splide } from '@splidejs/react-splide'
import EventSlide from './EventSlide'
import {
    faArrowLeftLong,
    faArrowRightLong
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useGetEventList from '../../hooks/useGetEventList'

export const EVENTS_LIMIT = 30

const sliderOptions = {
    type: 'slide',
    perPage: 14,
    autoplay: true,
    arrows: false,
    rewind: true,
    breakpoints: {
        5120: {
            perPage: 4,
        },
        4096: {
            perPage: 4,
        },
        2560: {
            perPage: 4,
        },
        1680: {
            perPage: 4,
        },
        1440: {
            perPage: 4,
        },
        1024: {
            perPage: 2,
        },
        767: {
            perPage: 2,
        },
        640: {
            perPage: 1,
        },
    },
}

/**
 * Slider which displays events for a specific centers (or locations)
 * @returns {JSX.Element}
 * @constructor
 */
const EventSlider = () => {
    const [showPrevious, setShowPrevious] = useState(false)
    const [showNext, setShowNext] = useState(true)
    const splideRef = useRef()

    const { isLoading, error, data, eventContext, eventsConfig } = useGetEventList(EVENTS_LIMIT)

    const callSlide = (direction) => {
        splideRef.current.go(splideRef.current.splide.index + direction)
    }

    const goToMiddle = () => {
        splideRef.current.go(splideRef.current.splide.length / 2)
    }

    const onMoved = (e, newIndex) => {
        setShowPrevious(newIndex > 0)
        setShowNext(newIndex < splideRef.current.splide.length - splideRef.current.splide._o.perPage)
    }

    return (
        <LoadingContainer data={data} isLoading={isLoading} error={error}>
            <div className="slider-nvigation">
                <FontAwesomeIcon icon={faArrowLeftLong} className="fa-2x"
                                  onClick={() => callSlide(-1)} style={{opacity: showPrevious ? 1 : 0.5}}/>
                {' '}
                <button className="splide__pagination__page" onClick={() => goToMiddle()}/>
                {' '}
                <FontAwesomeIcon icon={faArrowRightLong} className="fa-2x"
                                  onClick={() => callSlide(1)} style={{opacity: showNext ? 1 : 0.5}}/>
            </div>
            <Splide className={`event-slider-${eventContext.id}`}
                    onMoved={onMoved}
                    options={sliderOptions}
                    ref={splideRef}>
                {data?.map((ev, i) => (
                        <EventSlide event={ev} i={i} eventsConfig={eventsConfig}
                                    key={i}/>
                    ),
                )}
            </Splide>
        </LoadingContainer>
    )
}

export default EventSlider