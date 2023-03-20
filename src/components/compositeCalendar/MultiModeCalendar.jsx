import React, { useContext } from 'react'
/**
 * Contains multiple calendar views
 * @constructor
 */
import DateStrip from './dateStrip/DateStrip'
import EventDateDisplay, {
    MultiDateQueryAdapter,
    SingleDateQueryAdapter,
    SingleDayQueryAdapter,
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
            <EventDateDisplay adapter={adapter} hideMissing={true}/>
            <EventDateModal/>
        </>
    )
}

const renderSwitch = (stateCalendar) => {
    switch (stateCalendar.cardType) {
        case CARD_TYPEUI_VIEW.LONG_CARD:
        case CARD_TYPEUI_VIEW.IMAGE_CARD:
            return (
                <>
                    {renderDateComponents(new SingleDateQueryAdapter())}
                    <DatePeriod/>
                    <EventDateDisplay adapter={new MultiDateQueryAdapter()} hideMissing={false} />
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
    const { stateCalendar } = compositeCalendarContext

    return (
        <div className="container-fluid">
            {renderSwitch(stateCalendar)}
        </div>
    )
}

export default MultiModeCalendar