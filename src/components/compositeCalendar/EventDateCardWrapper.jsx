import { useTranslation } from '../../i18n'
import React, { useContext } from 'react'
import CompositeCalendarContext, { DATE_ACTIONS } from '../../context/CompositeCalendarContext'
import { timeAfterNow } from '../../utils/dateUtils'

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
    const { dispatchDate } = useContext(CompositeCalendarContext)

    const showEventDate = (e) => {
        e.preventDefault()
        dispatchDate({
            type: DATE_ACTIONS.SHOW_MODAL_EVENT_DATE,
            payload: { modalEventDateId: ev.eventDateId },
        })
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