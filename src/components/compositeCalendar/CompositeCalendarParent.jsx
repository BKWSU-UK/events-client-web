import CompositeCalendarContext, {
    CARD_TYPE,
    CompositeCalendarContextProvider,
} from '../../context/CompositeCalendarContext'
import React, { useContext } from 'react'
import MultiModeCalendar from './MultiModeCalendar'
import SearchButtonsContainer from './controlPanel/SearchButtonsContainer'

/**
 * Wraps the composite calendar around a context provider.
 * @returns {JSX.Element}
 * @constructor
 */
const DateStripCalendarParent = () => {

    return (
        <CompositeCalendarContextProvider>
            <SearchButtonsContainer />
            <MultiModeCalendar />
        </CompositeCalendarContextProvider>
    )
}

export default DateStripCalendarParent