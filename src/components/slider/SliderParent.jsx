import React from 'react'
import { CompositeCalendarContextProvider } from '../../context/CompositeCalendarContext'

/**
 * Slider parent component used to wrap the context around the main component.
 * @returns {JSX.Element}
 * @constructor
 */
const SliderParent = () => {
    return (
        <CompositeCalendarContextProvider>
        </CompositeCalendarContextProvider>
    )
}

export default SliderParent