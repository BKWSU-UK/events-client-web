import React from 'react'
import useCalendarModes from '../../../hooks/useCalendarModes'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const CalendarModesButton = ({calendarModes, activeOnType, t, isMobile=false}) => {
    return (
        <>
            {calendarModes.map((ct, i) => (
                <button key={i} type="button" data-toggle="button"
                        className={`btn btn-info ${activeOnType(ct.cardType)}`}
                        onClick={ct.func}>{isMobile ? <FontAwesomeIcon icon={ct.icon}/> : t(ct.label)}</button>
            ))}
        </>
    )
}

/**
 * Used to switch between the calendar modes.
 * @returns {JSX.Element}
 * @constructor
 */
export const CalendarModes = () => {

    const [calendarModes, activeOnType, t] = useCalendarModes()

    return (
        <>
            <CalendarModesButton activeOnType={activeOnType} calendarModes={calendarModes} t={t} />
        </>
    )

}

export default CalendarModes