import React, { useContext } from 'react'
/**
 * Contains multiple calendar views
 * @constructor
 */
import DateStrip from './dateStrip/DateStrip'
import EventDateDisplay, {
    MultiDateQueryAdapter,
    SingleDateQueryAdapter,
} from './EventDayDisplay'
import DatePeriod from './DatePeriod'
import SingleDateTitle from './SingleDateTitle'
import EventDateModal from './EventDateModal'
import CompositeCalendarContext, { CARD_TYPE } from '../../context/CompositeCalendarContext'
import ClassicCalendar from './ClassicCalendar'

const renderSwitch = (stateDate) => {
    switch (stateDate.cardType) {
        case CARD_TYPE.LONG_CARD:
        case CARD_TYPE.IMAGE_CARD:
            return (
                <>
                    <DateStrip/>
                    <SingleDateTitle/>
                    <EventDateDisplay adapter={new SingleDateQueryAdapter()}/>
                    <DatePeriod/>
                    <EventDateDisplay adapter={new MultiDateQueryAdapter()}/>
                    <EventDateModal/>
                </>
            )
        case CARD_TYPE.MONTH:
            return (
                <>
                    <ClassicCalendar/>
                    <EventDateModal/>
                </>
            )
    }
}

/**
 * Calendar used to display events in a period or on a specific day.
 * @returns {JSX.Element}
 * @constructor
 */
const MultiModeCalendar = () => {

    const compositeCalendarContext = useContext(CompositeCalendarContext)
    const { stateDate } = compositeCalendarContext

    return (
        <div className="container-fluid">
            {renderSwitch(stateDate)}
        </div>
    )
}

export default MultiModeCalendar