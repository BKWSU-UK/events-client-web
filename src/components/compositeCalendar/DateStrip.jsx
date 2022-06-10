import React, { useContext, useEffect, useRef, useState } from 'react'
import { Splide } from '@splidejs/react-splide'
import CompositeCalendarContext, { DATE_ACTIONS } from '../../context/CompositeCalendarContext'
import { formatHeaderDates, iterateDates } from '../../utils/dateUtils'
import DateSlide from './DateSlide'

const sliderOptions = {
    type: 'slide',
    perPage: 14,
    autoplay: false,
    breakpoints: {
        5120: {
            perPage: 14,
        },
        4096: {
            perPage: 14,
        },
        2560: {
            perPage: 14,
        },
        1680: {
            perPage: 14,
        },
        1440: {
            perPage: 14,
        },
        1024: {
            perPage: 7,
        },
        767: {
            perPage: 7,
        },
        640: {
            perPage: 7,
        },
    },
}

/**
 * Used to select date ranges.
 * @constructor
 */
const DateStrip = ({slideOnClick}) => {

    const splideRef = useRef()
    const compositeCalendarContext = useContext(CompositeCalendarContext)
    const { stateDate, dispatchDate } = compositeCalendarContext

    useEffect(() => {
        console.log('stateDate.startBefore', stateDate.startBefore)
        dispatchDate({ type: DATE_ACTIONS.INIT_DATE })
    }, [stateDate.startBefore, stateDate.endAfter])

    const onMoved = (e, newIndex) => {
        const finalIndex = newIndex + splideRef.current.options.perPage
        console.log('finalIndex', finalIndex)
        const slides = splideRef.current.slides
        const dateStr = slides[newIndex].getAttribute('value')
        const dateSplits = dateStr.split('-')
        const visibleDateStart = new Date(dateSplits[0], dateSplits[1],
            dateSplits[2])
        dispatchDate(
            { type: DATE_ACTIONS.SET_PERIOD, payload: { visibleDateStart } })
    }

    function onResized(splide2) {
        dispatchDate({
            type: DATE_ACTIONS.SET_RANGE,
            payload: { dateRange: splide2._o.perPage },
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <Splide className="calendar-date-strip"
                            options={sliderOptions}
                            onMoved={onMoved}
                            onResized={onResized}
                            ref={splideRef}>
                        {!!stateDate.startDate &&
                        iterateDates(stateDate.startDate, stateDate.endDate).
                            map((d, i) => {
                                return (
                                    <DateSlide date={d} key={i} />
                                )
                            })}
                    </Splide>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <h3 className="mt-5">{formatHeaderDates(stateDate.visibleDateStart)}</h3>
                </div>
                <div className="col-6 text-right">
                    <h3 className="mt-5">{formatHeaderDates(stateDate.visibleDateEnd)}</h3>
                </div>
            </div>
        </div>
    )
}

export default DateStrip