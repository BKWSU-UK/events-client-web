import { CompositeCalendarContextProvider } from '../../context/CompositeCalendarContext'
import React from 'react'
import DateStripCalendar from './DateStripCalendar'
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
            <DateStripCalendar />
        </CompositeCalendarContextProvider>
    )
}

export default DateStripCalendarParent