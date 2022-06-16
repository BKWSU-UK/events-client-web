import React, { useContext } from 'react'
import CompositeCalendarContext, { DATE_ACTIONS } from '../../../context/CompositeCalendarContext'
import { convertDate } from '../../../utils/dateUtils'

/**
 * Used to select a single date.
 * @constructor
 */
const DateSelector = () => {
    const { stateCalendar, dispatchDate } = useContext(CompositeCalendarContext)

    const onChangeDate = (e) => {
        const value = e.target.value
        if (!!value) {
            const splits = value.split('-')
            const year = parseInt(splits[0])
            const month = parseInt(splits[1])
            const day = parseInt(splits[2])
            const targetDate = new Date(year, month - 1, day)
            dispatchDate({
                type: DATE_ACTIONS.SELECT_SINGLE_DATE,
                payload: { selectedSingleDate: targetDate },
            })
        }
    }

    const convertDateToStr = (date) => {
        if (!date) {
            return ''
        }
        return convertDate(date)
    }

    return (
        <input type="date"
               className="calendar-today btn btn-info"
               onChange={onChangeDate}
               value={convertDateToStr(
                   stateCalendar.selectedSingleDate)}/>
    )
}

export default DateSelector