import React, { useContext, useEffect, useRef } from 'react'
import { Splide } from '@splidejs/react-splide'
import CompositeCalendarContext, { DATE_ACTIONS } from '../../../context/CompositeCalendarContext'
import { convertDate, iterateDates } from '../../../utils/dateUtils'
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
            perPage: 4,
        },
    },
}

/**
 * Used to select date ranges.
 * @constructor
 */
const DateStrip = () => {

    const splideRef = useRef()
    const compositeCalendarContext = useContext(CompositeCalendarContext)
    const { stateDate, dispatchDate } = compositeCalendarContext

    useEffect(() => {
        dispatchDate({ type: DATE_ACTIONS.INIT_DATE })
    }, [stateDate.startBefore, stateDate.endAfter])

    useEffect(() => {
        if(!!stateDate.selectedSingleDate) {
            const index = splideRef.current.slides.findIndex(s => {
                const splits = s.getAttribute('value').split('-')
                const selectedSingleDate = stateDate.selectedSingleDate
                const year = selectedSingleDate.getFullYear()
                const month = selectedSingleDate.getMonth()
                const day = selectedSingleDate.getDate()
                return splits[0] === year.toString() && splits[1] === month.toString() &&
                    splits[2] === day.toString()
            })
            console.log('Navigating to index', index)
            splideRef.current.go(index)
        }
    }, [stateDate.selectedSingleDate])

    const onMoved = (e, newIndex) => {
        const finalIndex = newIndex + splideRef.current.options.perPage
        const slides = splideRef.current.slides
        const dateStr = slides[newIndex].getAttribute('value')
        const dateSplits = dateStr.split('-')
        const visibleDateStart = new Date(dateSplits[0], dateSplits[1],
            dateSplits[2])
        dispatchDate(
            { type: DATE_ACTIONS.SET_PERIOD, payload: { visibleDateStart } })
    }

    function onResized (splide2) {
        dispatchDate({
            type: DATE_ACTIONS.SET_RANGE,
            payload: { dateRange: splide2._o.perPage },
        })
    }

    return (

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
                            const isoDate = convertDate(d)
                            let eventCount = 0
                            if (!!stateDate.groupedCount &&
                                !!stateDate.groupedCount[isoDate]) {
                                eventCount = stateDate.groupedCount[isoDate]
                            }
                            return (
                                <DateSlide date={d} key={i}
                                           eventCount={eventCount}/>
                            )
                        })}
                </Splide>
            </div>
        </div>

    )
}

export default DateStrip