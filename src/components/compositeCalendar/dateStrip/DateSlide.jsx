import { SplideSlide } from '@splidejs/react-splide'
import React, { useContext } from 'react'
import { useTranslation } from '../../../i18n'
import CompositeCalendarContext, { DATE_ACTIONS } from '../../../context/CompositeCalendarContext'
import EventCountDots from './EventCountDots'
import { isBeforeToday } from '../../../utils/dateUtils'

const isToday = (date) => {
    const now = new Date()
    return date.getDate() === now.getDate() && date.getMonth() ===
        now.getMonth()
        && date.getFullYear() === now.getFullYear()
}

const weekDayMap = {
    0: 'SU',
    1: 'MO',
    2: 'TU',
    3: 'WE',
    4: 'TH',
    5: 'FR',
    6: 'SA',
}

const monthMap = {
    0: 'JAN',
    1: 'FEB',
    2: 'MAR',
    3: 'APR',
    4: 'MAY',
    5: 'JUN',
    6: 'JUL',
    7: 'AUG',
    8: 'SEP',
    9: 'OCT',
    10: 'NOV',
    11: 'DEC',
}

/**
 * Draws the date and triggers events used to fetch events.
 * @constructor
 */
const DateSlide = ({ date, i, eventCount }) => {

    const compositeCalendarContext = useContext(CompositeCalendarContext)
    const { stateCalendar, dispatchDate } = compositeCalendarContext

    const { t } = useTranslation()
    const day = date.getDate()
    const monthIndex = date.getMonth()
    const isFirst = day === 1
    const isSelected = stateCalendar.selectedSingleDate?.getDate() ===
        date?.getDate()
        && stateCalendar.selectedSingleDate?.getMonth() === date?.getMonth()
        && stateCalendar.selectedSingleDate?.getFullYear() === date?.getFullYear()

    const clickHandler = (e) => {
        dispatchDate({
            type: DATE_ACTIONS.SELECT_SINGLE_DATE,
            payload: {
                selectedSingleDate: date,
            },
        })
    }

    return (
        <SplideSlide key={i}
                     className={`calendar-date-strip-slide 
                        ${
                         isSelected && 'calendar-date-selected' ||
                         isToday(date) && 'calendar-date-today' ||
                         isBeforeToday(date) && 'calendar-date-past' ||
                         isFirst && 'calendar-month-first'}`}
                     value={`${date.getFullYear()}-${date.getMonth()}-${day}`}
                     onClick={clickHandler}
        >
            <div
                className="week-day">{t(
                `weekday_${weekDayMap[date.getDay()]}`)}</div>
            <div
                className="month-day">{date.getDate()}</div>
            {isFirst && <div
                className="month">{monthMap[monthIndex]}</div>}
            {<EventCountDots eventCount={eventCount}/>}
        </SplideSlide>
    )
}

export default DateSlide
