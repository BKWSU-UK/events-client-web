import React, { useContext } from 'react'
import CompositeCalendarContext, { DATE_ACTIONS } from '../../../context/CompositeCalendarContext'
import { convertDate, convertMonth } from '../../../utils/dateUtils'

export const safeStartDate = (stateDate) => {
    let date = stateDate.visibleDateStart || stateDate.selectedSingleDate
    if (!date) {
        date = new Date()
    }
    return date
}

/**
 * Used to select a single date.
 * @constructor
 */
const MonthSelector = () => {
    const { stateDate, dispatchDate } = useContext(CompositeCalendarContext)

    const onChangeDate = (e) => {
        const value = e.target.value
        if (!!value) {
            const splits = value.split('-')
            const year = parseInt(splits[0])
            const month = parseInt(splits[1])
            const targetDate = new Date(year, month - 1, 1)
            const monthEnd = new Date(year, (month) % 12, 1)
            dispatchDate({
                type: DATE_ACTIONS.SELECT_MONTH,
                payload: { visibleDateEnd: monthEnd, selectedSingleDate: targetDate },
            })
        }
    }

    const convertDateToStr = () => {
        return convertMonth(safeStartDate(stateDate))
    }

    return (
        <input type="month"
               className="calendar-today btn btn-info"
               onChange={onChangeDate}
               value={convertDateToStr()}/>
    )
}

export default MonthSelector