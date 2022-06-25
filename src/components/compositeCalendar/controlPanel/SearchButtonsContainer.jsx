import React, { useContext } from 'react'
import CompositeCalendarContext, {
    CARD_TYPEUI_VIEW, CompositeCalendarContextProvider,
    DATE_ACTIONS,
} from '../../../context/CompositeCalendarContext'
import { useTranslation } from '../../../i18n'
import CalendarModes from './CalendarModes'
import OnlineStatusButtons from './OnlineInPerson'
import DateSelector from './DateSelector'
import MonthSelector from './MonthSelector'
import TodayButton from './TodayButton'
import WeekSelector from './WeekSelector'
import CalendarModesMobile from './CalendarModesMobile'
import FilterPanel from '../filterPanel/FilterPanel'
import DateAndFilter from './DateAndFilter'

export const switchDateSelectionType = (stateCalendar) => {
    switch(stateCalendar.cardType) {
        case CARD_TYPEUI_VIEW.MONTH:
            return <MonthSelector />
        case CARD_TYPEUI_VIEW.WEEK:
            return <WeekSelector />
        default:
            return <DateSelector />
    }
}

/**
 * Displays the buttons used to navigate the dates.
 * @returns {JSX.Element}
 * @constructor
 */
const SearchButtonsContainer = () => {

    const { stateCalendar } = useContext(CompositeCalendarContext)
    const { t } = useTranslation()

    return (
        <>
            <div className="row calendar-navigation-filters">
                <div className="col-12 col-md-6 mb-3 calendar-modes">
                    <CalendarModes/>
                </div>
                <div className="col-12 col-md-6 mb-3 calendar-online-status">
                    <OnlineStatusButtons />
                </div>
            </div>
            <div className="row calendar-mode-status-mobile">
                <CalendarModesMobile />
            </div>
            <div className="row calendar-button-row calendar-dates-other-filters">
                <div className="col-12">
                    <DateAndFilter />
                </div>
            </div>
        </>
    )
}

export default SearchButtonsContainer