import { CompositeCalendarContextProvider } from '../../context/CompositeCalendarContext'
import React from 'react'
import CompositeCalendar from './CompositeCalendar'

/**
 * Wraps the composite calendar around a context provider.
 * @returns {JSX.Element}
 * @constructor
 */
const CompositeCalendarParent = () => {
    return (
        <CompositeCalendarContextProvider>
            <CompositeCalendar />
        </CompositeCalendarContextProvider>
    )
}

export default CompositeCalendarParent