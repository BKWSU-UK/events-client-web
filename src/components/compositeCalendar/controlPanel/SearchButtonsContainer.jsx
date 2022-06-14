import React, { useContext } from 'react'
import CompositeCalendarContext, {
    CARD_TYPE,
    DATE_ACTIONS,
} from '../../../context/CompositeCalendarContext'
import { useTranslation } from '../../../i18n'
import CalendarModes from './CalendarModes'
import OnlineStatusButtons from './OnlineInPerson'
import DateSelector from './DateSelector'
import MonthSelector from './MonthSelector'
import TodayButton from './TodayButton'

const switchDateSelectionType = (stateDate) => {
    switch(stateDate.cardType) {
        case CARD_TYPE.MONTH:
            return <MonthSelector />
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

    const { stateDate } = useContext(CompositeCalendarContext)
    const { t } = useTranslation()

    return (
        <>
            <div className="row">
                <div className="col-12 col-md-6 mb-3 calendar-modes">
                    <CalendarModes/>
                </div>
                <div className="col-12 col-md-6 mb-3 calendar-online-status">
                    <OnlineStatusButtons />
                </div>
            </div>
            <div className="row calendar-button-row">
                <div className="col-12 col-md-6 mb-3">
                    <TodayButton />
                    {' '}
                    {switchDateSelectionType(stateDate)}
                </div>
            </div>
        </>
    )
}

export default SearchButtonsContainer