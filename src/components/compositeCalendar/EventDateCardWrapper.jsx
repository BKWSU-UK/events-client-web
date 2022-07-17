import { useTranslation } from '../../i18n'
import React, { useContext } from 'react'
import CompositeCalendarContext, { DATE_ACTIONS } from '../../context/CompositeCalendarContext'
import { timeAfterNow } from '../../utils/dateUtils'
import EventContext from '../../context/EventContext'
import { handleShowEventDate } from '../commonActions'

/**
 * Wrapper around a component that does the rendering.
 * @param children
 * @param ev
 * @param timeFormat
 * @returns {JSX.Element}
 * @constructor
 */
const EventDateCardWrapper = ({children, ev, timeFormat}) => {

    const { t } = useTranslation()
    const eventContext = useContext(EventContext)
    const { dispatchDate } = useContext(CompositeCalendarContext)

    const showEventDate = (e) => {
        handleShowEventDate(eventContext, ev, dispatchDate)
    }

    const startAfterNow = !!timeAfterNow(ev.startIso)

    const childrenWithProps = React.Children.map(children, child => {
        // Checking isValidElement is the safe way and avoids a typescript
        // error too.
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { ev, timeFormat, showEventDate, startAfterNow });
        }
        return child;
    });

    return (
        <>{childrenWithProps}</>
    )
}

export default EventDateCardWrapper