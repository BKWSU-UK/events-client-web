import React, { useContext } from 'react'
/**
 * Contains multiple calendar views
 * @constructor
 */
import DateStrip from './dateStrip/DateStrip'
import EventDateDisplay, {
    MixedSingleDateQueryAdapter,
    MultiDateQueryAdapter,
    SingleDateQueryAdapter, SingleDayQueryAdapter,
} from './EventDayDisplay'
import DatePeriod from './DatePeriod'
import SingleDateTitle from './SingleDateTitle'
import EventDateModal from './EventDateModal'
import CompositeCalendarContext, { CARD_TYPEUI_VIEW } from '../../context/CompositeCalendarContext'
import ClassicCalendar from './ClassicCalendar'

const renderDateComponents = (adapter) => {
    return (
        <>
            <DateStrip/>
            <SingleDateTitle/>
            <EventDateDisplay adapter={adapter}/>
            <EventDateModal/>
        </>
    )
}

const renderSwitch = (stateDate) => {
    switch (stateDate.cardType) {
        case CARD_TYPEUI_VIEW.LONG_CARD:
        case CARD_TYPEUI_VIEW.IMAGE_CARD:
            return (
                <>
                    {renderDateComponents(new SingleDateQueryAdapter())}
                    <DatePeriod/>
                    <EventDateDisplay adapter={new MultiDateQueryAdapter()}/>
                </>
            )
        case CARD_TYPEUI_VIEW.MONTH:
        case CARD_TYPEUI_VIEW.WEEK:
            return (
                <>
                    <ClassicCalendar/>
                    <EventDateModal/>
                </>
            )
        case CARD_TYPEUI_VIEW.DAY:
            return renderDateComponents(new SingleDayQueryAdapter())
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