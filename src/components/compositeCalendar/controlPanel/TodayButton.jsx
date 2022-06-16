import React, { useContext } from 'react'
import CompositeCalendarContext, { DATE_ACTIONS } from '../../../context/CompositeCalendarContext'
import { useTranslation } from '../../../i18n'

/**
 * Button used to set the date to today.
 * @returns {JSX.Element}
 * @constructor
 */
const TodayButton = () => {

    const { stateCalendar, dispatchDate } = useContext(CompositeCalendarContext)
    const { t } = useTranslation()

    const setToday = () => {
        dispatchDate({
            type: DATE_ACTIONS.SELECT_SINGLE_DATE,
            payload: { selectedSingleDate: new Date() },
        })
    }

    return (
        <button type="button"
                className="calendar-today btn btn-info"
                onClick={setToday}>&#128197; <span
            className="d-none d-md-inline">{t('today')}</span>
        </button>
    )
}

export default TodayButton