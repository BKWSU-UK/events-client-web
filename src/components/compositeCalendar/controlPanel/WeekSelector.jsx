import React, { useContext } from 'react'
import CompositeCalendarContext, { DATE_ACTIONS } from '../../../context/CompositeCalendarContext'
import moment from 'moment'
import { dateDiff } from '../../../utils/dateUtils'
import { safeStartDate } from './MonthSelector'
import { isSafari, isFirefox } from 'react-device-detect';
import AlternateWeekSelector from './AlternateWeekSelector'

/**
 * Used to select the week mode.
 * @constructor
 */
const WeekSelector = () => {
    const { stateDate, dispatchDate } = useContext(CompositeCalendarContext)

    const onChangeDate = (e) => {
        const weekMoment = moment(e.target.value)
        const weekStart = weekMoment.toDate()
        const weekEnd = dateDiff(weekStart, 7)
        dispatchDate({
            type: DATE_ACTIONS.SELECT_WEEK,
            payload: { visibleDateEnd: weekEnd, selectedSingleDate: weekStart },
        })
    }

    const convertDateToStr = () => {
        const date = safeStartDate(stateDate)
        return moment(date).format('GGGG[-W]WW')
    }
    if(isSafari || isFirefox) {
        return <AlternateWeekSelector value={convertDateToStr()} onChange={onChangeDate}/>
    }
    return (
        <input type="week"
               className="calendar-today btn btn-info"
               onChange={onChangeDate}
               value={convertDateToStr()}/>
    )
}

export default WeekSelector