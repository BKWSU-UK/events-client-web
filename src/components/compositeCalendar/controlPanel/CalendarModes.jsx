import React from 'react'
import useCalendarModes from '../../../hooks/useCalendarModes'

export const CalendarModesButton = ({calendarModes, activeOnType, t}) => {
    return (
        <>
            {calendarModes.map((ct, i) => (
                <button key={i} type="button" data-toggle="button"
                        className={`btn btn-info ${activeOnType(ct.cardType)}`}
                        onClick={ct.func}>{t(ct.label)}</button>
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