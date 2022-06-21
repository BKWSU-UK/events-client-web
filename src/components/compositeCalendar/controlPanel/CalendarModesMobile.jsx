import React, { useState } from 'react'
import useCalendarModes from '../../../hooks/useCalendarModes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { CalendarModesButton } from './CalendarModes'
import useOnlineStatus from '../../../hooks/useOnlineStatus'
import { OnlineStatusButtonsRender } from './OnlineInPerson'
import TodayButton from './TodayButton'
import { switchDateSelectionType } from './SearchButtonsContainer'

/**
 * Used to switch between the calendar modes.
 * @returns {JSX.Element}
 * @constructor
 */
export const CalendarModesMobile = () => {

    const [show, setShow] = useState(false)
    const [calendarModes, activeOnType, t] = useCalendarModes()
    const [stateCalendar, activateOnline, activateInPerson] = useOnlineStatus()

    return (
        <>
            <div className="col-12">
                <button className={`btn btn-${show ? 'success' : 'info'}`} onClick={() => setShow(!show)}>
                    <FontAwesomeIcon icon={faBars}/></button>
                {show && (
                    <div className="float-right">
                        <OnlineStatusButtonsRender t={t}
                                                   activateInPerson={activateInPerson}
                                                   activateOnline={activateOnline}
                                                   stateCalendar={stateCalendar}/>
                    </div>
                )}
            </div>
            <div className="col-12 calendar-modes-button-mobile">
                {show && <CalendarModesButton activeOnType={activeOnType}
                                              calendarModes={calendarModes}
                                              t={t}/>}
            </div>
            {show && <div className="col-12 col-md-6 mb-3">
                <TodayButton />
                {' '}
                {switchDateSelectionType(stateCalendar)}
            </div>}
        </>
    )

}

export default CalendarModesMobile